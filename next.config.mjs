/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exam.elevateegy.com',
        pathname: '/uploads/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
