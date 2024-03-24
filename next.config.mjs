/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            'typeorm',
            'bcryptjs',
            'jsonwebtoken',
            'mysql'
        ]
    }
};

export default nextConfig;
