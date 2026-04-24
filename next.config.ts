import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Plugins added here once Turbopack fully supports them
  // remark-gfm and rehype-pretty-code will be wired in next phase
});

const nextConfig: NextConfig = {
  // Allow .mdx files as pages and routes
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  images: {
    remotePatterns: [],
  },
};

export default withMDX(nextConfig);
