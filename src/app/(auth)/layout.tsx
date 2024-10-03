import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen items-center flex-col justify-center">
            <Header />
            <div className="flex justify-center">
                <div className="w-5xl self-center py-12">
                    <div className="w-full px-5">
                        {children}
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
