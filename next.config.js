/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  // output: "export", // This enables static site generation
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
  },
};

module.exports = nextConfig;
