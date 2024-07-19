/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
import path from 'path';

export default {
  images: {
    domains: ['ap-south-1.graphassets.com',"lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd());
    return config;
  },
};



