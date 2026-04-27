import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [
      './node_modules/@payloadcms/ui/dist/scss',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default withPayload(nextConfig)
