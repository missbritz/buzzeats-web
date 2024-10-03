'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MealForm from '@/components/MealForm';

export default function Home() {
    return (
        <main className="min-h-screen items-center flex-col justify-center">
            <Header />
            <div className="flex justify-center">
                <div className="max-w-5xl flex items-center text-center min-h-80 py-12">
                    <div className="w-full px-5">
                        <MealForm />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
