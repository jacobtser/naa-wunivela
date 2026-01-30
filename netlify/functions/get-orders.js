/**
 * Naa-Wuni Vela - Serverless Get Orders
 * Netlify/Vercel compatible
 */

const fs = require("fs");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

  // Allow GET (legacy) and POST (preferred)
  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return jsonResponse({ success: false, message: "Method not allowed" }, 405);
  }

  try {
    // Authenticate request
    const expectedKey =
      process.env.ADMIN_KEY || `admin_orders_${new Date().getFullYear()}`;

    let authorized = false;

    // 1) Check POST body for adminPassword (preferred)
    if (event.httpMethod === "POST") {
      try {
        const body = JSON.parse(event.body || "{}");
        const provided = body.adminPassword || body.admin_key || "";
        if (
          provided &&
          process.env.ADMIN_PASSWORD &&
          provided === process.env.ADMIN_PASSWORD
        ) {
          authorized = true;
        }
        // optionally allow admin_key (legacy) in POST body
        if (
          !authorized &&
          provided &&
          expectedKey &&
          provided === expectedKey
        ) {
          authorized = true;
        }
      } catch (e) {
        // ignore JSON parse errors
      }
    }

    // 2) Fallback: check query parameter admin_key (legacy GET)
    if (!authorized) {
      const adminKey = event.queryStringParameters?.admin_key;
      if (adminKey && expectedKey && adminKey === expectedKey) {
        authorized = true;
      }
    }

    if (!authorized) {
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
