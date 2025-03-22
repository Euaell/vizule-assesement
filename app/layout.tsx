import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "Generate Survey",
	description: "Generate Survey",
};

const nunito = Nunito({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${nunito.className} antialiased`}>{children}</body>
		</html>
	);
}
