/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gitlab.lnu.se', 'secure.gravatar.com']
  }
}

module.exports = nextConfig
