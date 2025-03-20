import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_PATH: "https://localhost:5001/",
  },
};

export default nextConfig;


