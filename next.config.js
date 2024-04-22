/** @type {import('next').NextConfig} */
const config = {
    experimental: {
      //serverActions: true, its used by default now in next14
      mdxRs: true,
      serverComponentsExternalPackages: ['mongoose']
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*'
        },
        {
          protocol: 'http',
          hostname: '*'
        },
      ]
    }
  }
   
  module.exports = config