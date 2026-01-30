/**
 * Naa-Wuni Vela - Serverless Order Processing
 * Netlify/Vercel compatible
 */

const fs = require("fs");
const path = require("path");

// Simulate headers for serverless
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

// Helper: Send JSON response
function jsonResponse(data, statusCode = 200) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(data),
  };
}

// Helper: Validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper: Sanitize input
function sanitize(data) {
  if (typeof data !== "string") return data;
  return data
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Helper: Save order to JSON
function saveOrderToFile(orderData) {
  try {
    // Use process.env.ORDERS_FILE or default
    const ordersFile = process.env.ORDERS_FILE || "/tmp/orders.json";
    let orders = [];

    if (fs.existsSync(ordersFile)) {
      const content = fs.readFileSync(ordersFile, "utf-8");
      orders = JSON.parse(content);
    }

    orders.push(orderData);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving order:", error);
    return false;
  }
}

// Main handler
exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  // Only POST allowed
  if (event.httpMethod !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    // Parse request body
    let data;
    try {
      data = JSON.parse(event.body || "{}");
    } catch (e) {
      return jsonResponse({ success: false, message: "Invalid JSON" }, 400);
    }

    // Validate required fields
    const requiredFields = [
      "customerName",
      "customerEmail",
      "customerPhone",
      "customerLocation",
      "items",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return jsonResponse(
          { success: false, message: `Missing required field: ${field}` },
          400,
        );
      }
    }

    // Validate email
    if (!validateEmail(data.customerEmail)) {
      return jsonResponse(
        { success: false, message: "Invalid email address" },
        400,
      );
    }

    // Validate items
    if (!Array.isArray(data.items) || data.items.length === 0) {
      return jsonResponse(
        { success: false, message: "No items in order" },
        400,
      );
    }

    // Generate order ID
    const orderId = `NV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    // Prepare order data
    const orderData = {
      order_id: orderId,
      customer_name: sanitize(data.customerName),
      customer_email: sanitize(data.customerEmail),
      customer_phone: sanitize(data.customerPhone),
      customer_location: sanitize(data.customerLocation),
      special_instructions: sanitize(data.specialInstructions || ""),
      items: data.items,
      total_amount: parseFloat(data.total) || 0,
      order_date: new Date().toISOString(),
      status: "pending",
      ip_address:
        event.headers["client-ip"] ||
        event.headers["x-forwarded-for"] ||
        "UNKNOWN",
    };

    // Save order (will use file or DB based on env)
    const saved = saveOrderToFile(orderData);

    if (!saved) {
      return jsonResponse(
        { success: false, message: "Failed to save order" },
        500,
      );
    }

    // Optional: Send email notification (implement if needed)
    // await sendEmailNotification(orderData);

    return jsonResponse({
      success: true,
      message: "Order placed successfully",
      orderId: orderId,
      data: {
        orderId: orderId,
        total: orderData.total_amount,
        status: "pending",
      },
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return jsonResponse(
      { success: false, message: "Internal server error" },
      500,
    );
  }
};
