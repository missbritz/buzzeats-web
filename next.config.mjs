/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    optimization: {
        minimize: false
    }
};

export default nextConfig;