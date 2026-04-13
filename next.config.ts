import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    loadPaths: [
      './node_modules/@payloadcms/ui/dist/scss',
    ],
  },
}

export default withPayload(nextConfig)
