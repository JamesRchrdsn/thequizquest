const createNextIntlPlugin = require("next-intl/plugin");

const plugin = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = plugin(nextConfig);
