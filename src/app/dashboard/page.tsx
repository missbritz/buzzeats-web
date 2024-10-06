'use client';

import UserMeals from '@/components/UserMeals';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

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

export default async function UserMeal() {

    const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }
    return (
        <UserMeals savedMeals={allMeals} />
    );
}
