/**
 * Naa-Wuni Vela - Serverless Get Orders
 * Netlify/Vercel compatible
 */

const fs = require("fs");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function jsonResponse(data, statusCode = 200) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(data),
  };
}

exports.handler = async (event) => {
  // Handle preflight
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  // Only GET allowed
  if (event.httpMethod !== "GET") {
    return jsonResponse({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    // Check for admin key (optional basic protection)
    const adminKey = event.queryStringParameters?.admin_key;
    const expectedKey =
      process.env.ADMIN_KEY || `admin_orders_${new Date().getFullYear()}`;

    if (adminKey !== expectedKey) {
      return jsonResponse({ success: false, message: "Unauthorized" }, 401);
    }

    // Read orders from file
    const ordersFile = process.env.ORDERS_FILE || "/tmp/orders.json";
    let orders = [];

    if (fs.existsSync(ordersFile)) {
      const content = fs.readFileSync(ordersFile, "utf-8");
      orders = JSON.parse(content || "[]");
    }

    // Sort by date descending
    orders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

    return jsonResponse({
      success: true,
      orders: orders.slice(0, 500), // Limit to 500 most recent
      total: orders.length,
    });
  } catch (error) {
    console.error("Get orders error:", error);
    return jsonResponse(
      { success: false, message: "Internal server error" },
      500,
    );
  }
};
