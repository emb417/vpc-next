/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "virtualpinballspreadsheet.github.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Expose the version number to the client-side bundle.
  env: {
    APP_VERSION: process.env.npm_package_version,
  },
};

export default nextConfig;
