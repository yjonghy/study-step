/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,

    assetPrefix: process.env.NODE_ENV === "production" ? "https://yjonghy.github.io/study-step" : "",

    trailingSlash: true,
    experimental: {
        appDir: true,
        scrollRestoration: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        return [
        ];
    },
    images: {
        unoptimized: true,
        formats: ['image/webp'],
    },
    generateEtags: false,

};
