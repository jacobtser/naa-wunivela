<?php
/**
 * Naa-Wuni Vela - Order Processing
 * Handles order submission and storage
 */

require_once 'config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    json_response(['success' => false, 'message' => 'Invalid JSON data'], 400);
}

// Validate required fields
$required_fields = ['customerName', 'customerEmail', 'customerPhone', 'customerLocation', 'items'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        json_response(['success' => false, 'message' => "Missing required field: $field"], 400);
    }
}

// Validate email
if (!validate_email($data['customerEmail'])) {
    json_response(['success' => false, 'message' => 'Invalid email address'], 400);
}

// Validate items
if (!is_array($data['items']) || empty($data['items'])) {
    json_response(['success' => false, 'message' => 'No items in order'], 400);
}

// Generate order ID
$orderId = 'NV-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 6));

// Prepare order data
$orderData = [
    'order_id' => $orderId,
    'customer_name' => sanitize($data['customerName']),
    'customer_email' => sanitize($data['customerEmail']),
    'customer_phone' => sanitize($data['customerPhone']),
    'customer_location' => sanitize($data['customerLocation']),
    'special_instructions' => sanitize($data['specialInstructions'] ?? ''),
    'items' => json_encode($data['items']),
    'total_amount' => floatval($data['total']),
    'order_date' => date('Y-m-d H:i:s'),
    'status' => 'pending',
    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
];

try {
    // Connect to database
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    // Create orders table if it doesn't exist
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id VARCHAR(50) UNIQUE NOT NULL,
            customer_name VARCHAR(255) NOT NULL,
            customer_email VARCHAR(255) NOT NULL,
            customer_phone VARCHAR(50) NOT NULL,
            customer_location TEXT NOT NULL,
            special_instructions TEXT,
            items JSON NOT NULL,
            total_amount DECIMAL(10,2) NOT NULL,
            order_date DATETIME NOT NULL,
            status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
            ip_address VARCHAR(45),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";

    $pdo->exec($createTableSQL);

    // Insert order
    $insertSQL = "
        INSERT INTO orders (
            order_id, customer_name, customer_email, customer_phone,
            customer_location, special_instructions, items, total_amount,
            order_date, status, ip_address
        ) VALUES (
            :order_id, :customer_name, :customer_email, :customer_phone,
            :customer_location, :special_instructions, :items, :total_amount,
            :order_date, :status, :ip_address
        )
    ";

    $stmt = $pdo->prepare($insertSQL);
    $stmt->execute($orderData);

    // Log the order
    log_activity("New order placed: $orderId by " . $data['customerName'], 'INFO');

    // Send notification email to admin (optional)
    sendAdminNotification($orderData);

    // Return success response
    json_response([
        'success' => true,
        'message' => 'Order placed successfully',
        'orderId' => $orderId,
        'data' => [
            'orderId' => $orderId,
            'total' => $orderData['total_amount'],
            'status' => 'pending'
        ]
    ]);

} catch (PDOException $e) {
    log_activity("Database error: " . $e->getMessage(), 'ERROR');
    
    // Fallback: Save order to file if database fails
    $ordersDir = __DIR__ . '/../backup_orders/';
    @mkdir($ordersDir, 0755, true);
    
    $orderFile = $ordersDir . $orderId . '.json';
    $fileData = array_merge($orderData, ['items' => json_decode($orderData['items'], true)]);
    file_put_contents($orderFile, json_encode($fileData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    log_activity("Order saved to backup file: $orderId", 'WARNING');
    
    // Try to send notification anyway
    @sendAdminNotification($orderData);
    
    // Return success even if database fails
    json_response([
        'success' => true,
        'message' => 'Order received! We will contact you shortly to confirm.',
        'orderId' => $orderId,
        'data' => [
            'orderId' => $orderId,
            'total' => $orderData['total_amount'],
            'status' => 'pending'
        ]
    ]);
    
} catch (Exception $e) {
    log_activity("Order processing error: " . $e->getMessage(), 'ERROR');
    json_response(['success' => false, 'message' => 'Failed to process order'], 500);
}

/**
 * Send notification email to admin
 */
function sendAdminNotification($orderData) {
    $adminEmail = ADMIN_EMAIL ?? CONTACT_EMAIL ?? 'admin@naawunivela.com';
    $siteName = SITE_NAME ?? 'Naa-Wuni Vela';

    $subject = "New Order Received - $orderData[order_id]";

    $items = json_decode($orderData['items'], true);
    $itemsText = '';
    foreach ($items as $item) {
        $itemsText .= "- {$item['product']['name']} (x{$item['quantity']}) - GHc {$item['subtotal']}\n";
    }

    $message = "
New Order Received

Order ID: {$orderData['order_id']}
Date: {$orderData['order_date']}

Customer Details:
Name: {$orderData['customer_name']}
Email: {$orderData['customer_email']}
Phone: {$orderData['customer_phone']}
Location: {$orderData['customer_location']}

Order Items:
$itemsText

Total: GHc {$orderData['total_amount']}

Special Instructions: " . ($orderData['special_instructions'] ?: 'None') . "

Please log into the admin panel to manage this order.
";

    $headers = [
        'From: ' . $siteName . ' <noreply@naawunivela.com>',
        'Reply-To: ' . $orderData['customer_email'],
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    ];

    // Try to send email (won't work on all servers)
    @mail($adminEmail, $subject, $message, implode("\r\n", $headers));
}
?>
