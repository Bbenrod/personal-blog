const axios = require("axios");

const PORT = process.env.PORT || "3000";
const BLOG_ROUTE = process.env.BLOG_ROUTE || "";
const API_VERSION = process.env.API_VERSION || "v1";

const BASE_URL =
  process.env.BASE_URL ||
  `http://localhost:${PORT}${BLOG_ROUTE}/api/${API_VERSION}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

module.exports = axiosInstance;
