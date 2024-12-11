/** @type {import('next').NextConfig} */
const packageJson = require('./package.json');
const nextConfig = {
  // reactStrictMode: false,
  env: {
    APP_VERSION: packageJson.version,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow images from any hostname
      },
    ],
  },
  // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

module.exports = nextConfig;
