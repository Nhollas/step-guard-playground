import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/journey/apple/introduction",
        permanent: false,
      },
      {
        source: "/journey/apple",
        destination: "/journey/apple/introduction",
        permanent: false,
      },
      {
        source: "/journey/orange",
        destination: "/journey/orange/introduction",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
