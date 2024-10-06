'use client';

import Meal from '@/components/Meal';
import MealJson from '../../../mock.json';

const meal = JSON.parse(JSON.stringify(MealJson))

export default function Meals() {
    return (
        <Meal meal={meal}/>
    );
}
