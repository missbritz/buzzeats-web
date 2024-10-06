/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    images: {
        unoptimized: true,
    },
    trailingSlash: true
};

export default nextConfig;