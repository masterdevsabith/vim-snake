import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Vim Snake - Classic Snake Game with Vim Key Controls",
	description:
		"Play the classic Snake game using Vim keys (H, J, K, L) to control the snake. A nostalgic browser game built with Next.js and Canvas by @masterdevsabith.",

	// Basic site info
	applicationName: "Vim Snake",
	authors: [
		{ name: "masterdevsabith", url: "https://github.com/masterdevsabith" },
	],
	generator: "Next.js",
	keywords: [
		"snake game",
		"vim snake",
		"vim keys",
		"canvas game",
		"next.js game",
		"browser game",
		"javascript snake",
	],
	creator: "masterdevsabith",
	publisher: "masterdevsabith",

	// Open Graph (for social sharing)
	openGraph: {
		title: "Vim Snake 🐍 – Play Snake Game with Vim Key Bindings",
		description:
			"Use H, J, K, and L to control your snake. A fun Vim-themed twist on the classic Snake game.",
		url: "https://vim-snake-navy.vercel.app",
		siteName: "Vim Snake",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Vim Snake Game Screenshot",
			},
		],
		locale: "en_US",
		type: "website",
	},

	// Twitter metadata
	twitter: {
		card: "summary_large_image",
		title: "Vim Snake - Play Snake with Vim Keys",
		description:
			"Control the snake with H, J, K, L just like in Vim. Built using Next.js and Canvas API.",
		creator: "@masterdevsabith",
		images: ["/og-image.png"],
	},

	// Icons (favicon + social)
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},

	// Theme / Color settings
	themeColor: "#000000",
	colorScheme: "dark",

	// Robots (SEO)
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	},

	// Manifest (for PWA / mobile)
	manifest: "/site.webmanifest",

	// Category for SEO
	category: "game",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
