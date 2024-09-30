/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "links.papareact.com",
      "i.ibb.co",
      "kajabi-storefronts-production.kajabi-cdn.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://upstash-meta-messenger-mocha.vercel.app/",
  },
};

export default nextConfig;
