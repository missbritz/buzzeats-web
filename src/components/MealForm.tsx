'use client';

import { Button } from './ui/button';
import Meal from './Meal';
import MealPage from './MealPage';
import { useState } from 'react';
import { MealTypeDef, ErrorDef } from './Meal';
import ErrorForm from './Error';

export default function MealForm() {
    const [meal, setMeal] = useState<MealTypeDef>({} as MealTypeDef);
    const [error, setError] = useState<ErrorDef>({} as ErrorDef);
    const [completed, setCompleted] = useState(false)

    return (
        <div className="w-full">
            {!completed ? <MealPage meal={setMeal} mealError={setError} completed={setCompleted}/> : null}
            {Object.keys(meal).length ? <Meal meal={meal}/> : null}
            {Object.keys(error).length ? <ErrorForm /> : null}
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    );
}
