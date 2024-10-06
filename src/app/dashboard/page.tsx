import UserMeals from '@/components/UserMeals';
import { createClient } from "../../../utils/supabase/server";
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

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }

    return (
        <UserMeals savedMeals={allMeals} user={user}/>
    );
}
