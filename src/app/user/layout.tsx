import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Buzzeats',
    description: 'AI-powered meal generator',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}