// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: 'Authorization, Content-Type' },
                    { key: "Access-Control-Allow-Credentials", value: "true" }
                ]
            }
        ]
    },
    /* config options here */
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    env: {
        BACKEND_URL: process.env.BACKEND_URL,

    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig