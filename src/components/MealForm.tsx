'use client';

import { Button } from './ui/button';
import Meal from './Meal';
import MealPage from './MealPage';
import { useState } from 'react';
import { MealTypeDef, ErrorDef } from './Meal';
import ErrorForm from './Error';
import { saveMeal } from '@/actions/tables';

export default async function MealForm({ user } : any) {
    const [meal, setMeal] = useState<MealTypeDef>({} as MealTypeDef);
    const [error, setError] = useState<ErrorDef>({} as ErrorDef);
    const [completed, setCompleted] = useState(false)
    const [message, setMessage] = useState(''); 

    // const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
    // const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

   // console.log(user)

    // const saveMeal = async (meal:MealTypeDef) => {
    //     const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
    //     const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
    //     // const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    //     const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    //    const { data } = await supabase.from('meals').insert({...meal});
      
    // }

    const SaveMealFn = (meal, userId) => {
        console.log(user)
        const saveMealData = saveMeal(meal, userId);
        setMessage(saveMealData) 
    }


    return (
        <div className="w-full">
            {!completed ? <MealPage meal={setMeal} mealError={setError} completed={setCompleted}/> : null}
            {Object.keys(meal).length ? (
                <div>
                    <Meal meal={meal} />
                    <div>
                        <Button onClick={() => SaveMealFn(meal, user.user_metadata.sub)}>Save this meal</Button>
                        {message}
                    </div>
                </div>
            ) : null}
            {Object.keys(error).length ? <ErrorForm /> : null}

            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    );
}
