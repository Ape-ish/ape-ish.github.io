/**
 * Static export config for GitHub Pages.
 *
 * If you deploy to a PROJECT page (https://<user>.github.io/<repo>/),
 * set `repo` to "/<repo>" — e.g. const repo = "/portfolio".
 *
 * If you deploy to a USER/ORG page (https://<user>.github.io/) or a custom
 * domain (cwhipple.me), leave `repo` as an empty string.
 */
const repo = "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: repo || undefined,
  assetPrefix: repo ? `${repo}/` : undefined,
};

export default nextConfig;
