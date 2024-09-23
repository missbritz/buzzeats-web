/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images: {
        unoptimized: true,
    },
    trailingSlash: true,
    exclude: [
        'supabase'
    ]
};

export default nextConfig;