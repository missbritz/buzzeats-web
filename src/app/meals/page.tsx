'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Meal from '@/components/Meal';
import MealJson from '../../../mock.json';

const meal = JSON.parse(JSON.stringify(MealJson))

export default function Meals() {
    return (
        <main className="min-h-screen items-center flex-col justify-center">
            <Header />
            <div className="flex justify-center">
                <div className="max-w-5xl w-full self-center py-12">
                    <div className="w-full px-5">
                        <Meal meal={meal}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
