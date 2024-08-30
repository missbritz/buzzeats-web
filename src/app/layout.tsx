import type { Metadata } from "next";
import "./globals.css";
import { Bangers } from "next/font/google";

export const bangers = Bangers({ weight: ["400"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
