import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/journey/apple/assumptions",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
