import type { NextConfig } from 'next';
console.log('🚀 Turbopack cwd:', process.cwd());
const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
