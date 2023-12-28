/** @type {import('next').NextConfig} */
module.exports = {
    basePath : "study-step",
    reactStrictMode: false,
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
