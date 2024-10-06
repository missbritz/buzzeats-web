import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
            <body className={poppins.className}>
            <main className="min-h-screen items-center flex-col justify-center">
                <Header />
                <div className="flex justify-center">
                    <div className="max-w-5xl w-full flex items-center text-center min-h-80 py-12">
                        <div className="w-full px-5">
                            <Suspense fallback={<>Loading...</>}>
                                {children}
                            </Suspense>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
            </body>
        </html>
    );
}
