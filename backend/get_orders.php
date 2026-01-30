<?php
/**
 * Naa-Wuni Vela - Get Orders API
 * Retrieves orders for admin panel
 */

require_once 'config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$orders = [];

try {
    // Try database first
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

    // Get orders from database
    $stmt = $pdo->query("SELECT * FROM orders ORDER BY order_date DESC LIMIT 500");
    $orders = $stmt->fetchAll();

} catch (PDOException $e) {
    // Fallback to backup files
    log_activity("Database error in get_orders: " . $e->getMessage() . " - Using backup files", 'ERROR');
    
    $backupDir = __DIR__ . '/../backup_orders/';
    if (is_dir($backupDir)) {
        $files = glob($backupDir . '*.json');
        
        // Sort files by modification time (newest first)
        usort($files, function($a, $b) {
            return filemtime($b) - filemtime($a);
        });
        
        foreach (array_slice($files, 0, 500) as $file) {
            $content = file_get_contents($file);
            if ($content) {
                $order = json_decode($content, true);
                if ($order) {
                    $orders[] = $order;
                }
            }
        }
    }
}

// Format orders for response
$formattedOrders = [];
foreach ($orders as $order) {
    // Handle items - could be array or JSON string
    $items = $order['items'];
    if (is_string($items)) {
        $items = json_decode($items, true);
    }
    
    $formattedOrders[] = [
        'id' => $order['id'] ?? $order['order_id'],
        'order_id' => $order['order_id'],
        'customer_name' => $order['customer_name'],
        'customer_email' => $order['customer_email'],
        'customer_phone' => $order['customer_phone'],
        'customer_location' => $order['customer_location'],
        'items' => $items,
        'total_amount' => floatval($order['total_amount']),
        'order_date' => $order['order_date'],
        'status' => $order['status'] ?? 'pending',
        'special_instructions' => $order['special_instructions'] ?? ''
    ];
}

json_response([
    'success' => true,
    'orders' => $formattedOrders,
    'total' => count($formattedOrders)
]);

?>
