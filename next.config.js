/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  
  images: {
    domains: ['api.mapbox.com'],
    unoptimized: true
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
  
  async rewrites() {
    return [
      {
        source: '/data/:path*',
        destination: '/api/governance/:path*'
      }
    ]
  },
  
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-governance.techletter.co',
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
  }
}

module.exports = withPWA(nextConfig)
