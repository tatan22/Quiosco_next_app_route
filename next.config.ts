import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			}
		]
	},
	experimental: {
		useCache: true, // 🔥 Activa el nuevo sistema de caché manual
	},
};

export default nextConfig;
