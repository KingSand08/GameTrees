/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "img.daisyui.com",
      "www.giantbomb.com",
      "gamekastle.com", // Added Game Kastle domain
    ],
  },
};

export default nextConfig;
