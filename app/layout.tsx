import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Quisco Next.Js con App Router y Prisma",
	description: "Quisco Next.Js con App Router y Prisma",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body
				// antialiased letras más suaves y delgadas
				className={`${inter.className} bg-gray-100 antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}
