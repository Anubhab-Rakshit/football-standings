/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["crests.football-data.org", "upload.wikimedia.org", "media.api-sports.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.football-data.org",
        pathname: "/**",
      },
    ],
  },
  
    transpilePackages: ['canvas-confetti'],

    webpack: (config) => {
    
      config.externals = [...(config.externals || []), { canvas: 'canvas' }];
      
      return config;
    },
  };
  
  export default nextConfig;
  
  