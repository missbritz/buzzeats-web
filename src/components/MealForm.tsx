'use client';

import Meal from './Meal';
import MealPage from './MealPage';
import { useState } from 'react';
import { MealTypeDef, ErrorDef } from '../types';
import ErrorForm from './Error';
import SaveMeal from './SaveMeal';

export default function MealForm({ user }: { user: any }) {
    const [meal, setMeal] = useState<MealTypeDef>({} as MealTypeDef);
    const [error, setError] = useState<ErrorDef>({} as ErrorDef);
    const [completed, setCompleted] = useState(false);

    return (
        <div className="w-full">
            {!completed ? (
                <MealPage meal={setMeal} mealError={setError} completed={setCompleted} />
            ) : null}
            {Object.keys(meal).length ? (
                <div>
                    <Meal meal={meal} />
                    <SaveMeal user={user} meal={meal} setCompleted={setCompleted} />
                </div>
            ) : null}
            {Object.keys(error).length ? <ErrorForm /> : null}
        </div>
    );
}
