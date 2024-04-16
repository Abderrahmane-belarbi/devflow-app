/** @type {import('next').NextConfig} */
const config = {
    experimental: {
      serverActions: true,
      mdxRs: true,
      serverComponentsExternalPackages: ['mongoose']
    },
  }
   
  module.exports = config