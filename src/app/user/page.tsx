'use client';

import UserMeals from '@/components/UserMeals';

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

export default function UserMeal() {
    return (
        <UserMeals savedMeals={allMeals} />
    );
}
