/** @type {import('next').NextConfig} */
const config = {
    experimental: {
      //serverActions: true, its used by default now in next14
      mdxRs: true,
      serverComponentsExternalPackages: ['mongoose']
    },
  }
   
  module.exports = config