const fs = require("fs");
const path = require("path");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    const { orderId, adminPassword } = JSON.parse(event.body);

    const expectedKey =
      process.env.ADMIN_KEY || `admin_orders_${new Date().getFullYear()}`;
    let authorized = false;
    if (
      adminPassword &&
      process.env.ADMIN_PASSWORD &&
      adminPassword === process.env.ADMIN_PASSWORD
    ) {
      authorized = true;
    }
    if (
      !authorized &&
      adminPassword &&
      expectedKey &&
      adminPassword === expectedKey
    ) {
      authorized = true;
    }

    if (!authorized) {
      return jsonResponse({ success: false, message: "Unauthorized" }, 401);
    }

    const ordersFile = path.resolve(__dirname, "../../backend/orders.json");
    let orders = [];

    if (fs.existsSync(ordersFile)) {
      const content = fs.readFileSync(ordersFile, "utf-8");
      orders = JSON.parse(content);
    }

    const updatedOrders = orders.filter((o) => o.order_id !== orderId);

    if (updatedOrders.length === orders.length) {
      return jsonResponse({ success: false, message: "Order not found" }, 404);
    }

    fs.writeFileSync(ordersFile, JSON.stringify(updatedOrders, null, 2));

    return jsonResponse({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Delete order error:", error);
    return jsonResponse(
      { success: false, message: "Internal server error" },
      500
    );
  }
};
