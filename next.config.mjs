/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      img-src 'self' data: https://cdn.discordapp.com https://virtualpinballspreadsheet.github.io;
      connect-src 'self' cloudflareinsights.com;
      style-src 'self' 'unsafe-inline';
      script-src 'self' 'unsafe-inline' static.cloudflareinsights.com;
      form-action 'self';
      frame-src 'none';
      frame-ancestors 'self';
      object-src 'none';
      base-uri 'none';
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
];

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "virtualpinballspreadsheet.github.io",
        pathname: "/**",
      },
    ],
  },

  env: {
    APP_VERSION: process.env.npm_package_version,
    METADATA_URL: "https://virtualpinballchat.com",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
