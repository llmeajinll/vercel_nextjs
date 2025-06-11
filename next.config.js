/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: false,
    // swcMinify: true,
    // experimental: {
    //     appDir: true,
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: '/app/api/:path*',
    //         },
    //     ];
    // },


    experimental: {
        appDir: true,
        serverActions: true
    }
};

module.exports = nextConfig;
