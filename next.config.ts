import { env } from '@/env'
import { withPayload } from '@payloadcms/next/withPayload'

export default withPayload({
  logging: {
    browserToTerminal: true,
  },
  reactStrictMode: false,
  poweredByHeader: false,
  devIndicators: false,
  allowedDevOrigins: ['192.168.0.159'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'brileec.com',
      },
      {
        protocol: 'https',
        hostname: env.NEXT_PUBLIC_R2_URL.replace('https://', '').replace('/', ''),
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
})
