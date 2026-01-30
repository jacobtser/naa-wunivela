// Simple smoke-test for Netlify serverless functions
// Usage: node scripts/smoke-test.js [apiBase] [adminPassword]
//   Default: http://localhost:8888/.netlify/functions admin2026
//   Example: node scripts/smoke-test.js https://eclectic-marigold-6a4cef.netlify.app/.netlify/functions admin2026

const http = require("http");
const https = require("https");

const baseArg = process.argv[2];
const passwordArg = process.argv[3];
const API_BASE = (
  baseArg ||
  process.env.API_BASE ||
  "http://localhost:8888/.netlify/functions"
).replace(/\/$/, "");
const ADMIN_PASSWORD =
  passwordArg ||
  process.env.ADMIN_PASSWORD ||
  process.env.ADMIN_KEY ||
  "admin2026";

function postJson(url, data, timeout = 10000) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const lib = parsed.protocol === "https:" ? https : http;
      const body = JSON.stringify(data || {});
      const opts = {
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
        path: parsed.pathname + (parsed.search || ""),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      };

      const req = lib.request(opts, (res) => {
        let chunks = "";
        res.on("data", (c) => (chunks += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(chunks || "{}");
            resolve({ status: res.statusCode, body: json });
          } catch (e) {
            resolve({ status: res.statusCode, body: chunks });
          }
        });
      });

      req.on("error", reject);
      req.setTimeout(timeout, () => {
        req.abort();
        reject(new Error("Request timed out"));
      });

      req.write(body);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

(async () => {
  console.log("API_BASE:", API_BASE);
  console.log("Testing get-orders (requires ADMIN_PASSWORD)");
  try {
    const getOrdersUrl = API_BASE + "/get-orders";
    const r1 = await postJson(getOrdersUrl, { adminPassword: ADMIN_PASSWORD });
    console.log("get-orders status:", r1.status);
    console.log("get-orders body:", JSON.stringify(r1.body, null, 2));
  } catch (err) {
    console.error("get-orders error:", err.message || err);
  }

  console.log("\nTesting order submission (POST /order)");
  try {
    const orderUrl = API_BASE + "/order";
    const sample = {
      customerName: "Test User",
      customerEmail: "test@example.com",
      customerPhone: "+233501234567",
      customerLocation: "Accra",
      items: [{ name: "Sample Product", quantity: 1, subtotal: 10 }],
      total: 10,
    };
    const r2 = await postJson(orderUrl, sample);
    console.log("order status:", r2.status);
    console.log("order body:", JSON.stringify(r2.body, null, 2));
  } catch (err) {
    console.error("order submission error:", err.message || err);
  }

  console.log("\nSmoke tests complete.");
})();
