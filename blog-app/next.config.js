/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
    publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000/api/v1' // development api
          : 'http://localhost:4000/api/v1/' // production api
  }

}

module.exports = nextConfig
