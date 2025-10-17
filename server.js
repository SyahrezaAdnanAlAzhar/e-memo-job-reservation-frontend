import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV || "production"}` });
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Configuration
const port = process.env.PORT || 3000;
const basePath = "/e-memo-job-reservation";

// Hardcoded fallback jika env tidak terbaca
const API_HOST = process.env.VITE_API_HOST || "http://localhost:8080";
const API_PATH = process.env.VITE_API_PATH || "/api/e-memo-job-reservation";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging untuk debugging
console.log("=".repeat(50));
console.log("🚀 Starting Production Server");
console.log("=".repeat(50));
console.log("Environment:", process.env.NODE_ENV || "production");
console.log("Port:", port);
console.log("Base Path:", basePath);
console.log("API Host:", API_HOST);
console.log("API Path:", API_PATH);
console.log("=".repeat(50));

// Proxy API Configuration
const proxyOptions = {
  target: API_HOST,
  changeOrigin: true,
  ws: true,
  logLevel: "debug",
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[PROXY] ${req.method} ${req.url} -> ${API_HOST}${req.url}`);
  },
  onError: (err, req, res) => {
    console.error(`[PROXY ERROR] ${err.message}`);
    res.status(500).json({
      error: "Proxy Error",
      message: err.message,
      target: API_HOST,
    });
  },
};

// Create proxy middleware
const apiProxy = createProxyMiddleware(proxyOptions);

// Apply proxy middleware
app.use(API_PATH, apiProxy);

console.log(`✅ Proxy configured: ${API_PATH} -> ${API_HOST}`);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    config: {
      port,
      basePath,
      apiHost: API_HOST,
      apiPath: API_PATH,
    },
  });
});

// Buat router untuk base path
const router = express.Router();

// Sajikan file statis dari 'dist' di dalam base path
router.use(
  express.static(path.join(__dirname, "dist"), {
    maxAge: "1d",
    etag: true,
  })
);

// Fallback SPA untuk base path - catch all requests yang tidak match dengan static files
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Gunakan router di base path
app.use(basePath, router);

// Redirect dari root ke base path
app.get("/", (req, res) => {
  res.redirect(basePath);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start server
app.listen(port, () => {
  console.log("\n" + "=".repeat(50));
  console.log(`✅ Production server running!`);
  console.log(`📍 Local: http://localhost:${port}`);
  console.log(`📍 App: http://localhost:${port}${basePath}`);
  console.log(`📍 Health: http://localhost:${port}/health`);
  console.log(`🔗 Proxy: ${API_PATH} -> ${API_HOST}`);
  console.log("=".repeat(50) + "\n");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\nSIGINT received, shutting down gracefully...");
  process.exit(0);
});
