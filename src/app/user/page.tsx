'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const allMeals = [
    {
        mealId: 'meal-1',
        mealDate: '03/10/2024',
        mealName: 'Avocado Toast'
    },
    {
        mealId: 'meal-2',
        mealDate: '03/10/2024',
        mealName: 'Spinach Mozarella Salad'
    },
    {
        mealId: 'meal-3',
        mealDate: '03/10/2024',
        mealName: 'Scrambled Eggs'
    }
]

export default function Home() {
    return (
        <main className="min-h-screen items-center flex-col justify-center">
            <Header />
            <div className="flex justify-center">
                <div className="max-w-5xl w-full self-center py-12">
                    <div className="w-full px-5">
                        <h2>Hi <strong>User</strong></h2>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px] text-left">Date</TableHead>
                                <TableHead className="text-left">Meal Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allMeals.map((meal) => (
                                <TableRow key={meal.mealId}>
                                    <TableCell className="font-medium text-left">{meal.mealDate}</TableCell>
                                    <TableCell className="text-left">{meal.mealName}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
}
