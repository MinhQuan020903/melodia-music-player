/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,

    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
