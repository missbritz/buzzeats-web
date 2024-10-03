'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Login from '@/components/Login';

export default function Meals() {
    return (
        <main className="min-h-screen items-center flex-col justify-center">
            <Header />
            <div className="flex justify-center">
                <div className="w-5xl self-center py-12">
                    <div className="w-full px-5">
                        <Login />
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
