'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { sectionTitle, allergenItems } from '@/config/constants';
import { createClient } from '@supabase/supabase-js';
import Meal from './Meal';
import MealPage from './MealPage';



const FormSchema = z.object({
    allergen: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: 'You have to select at least one item.',
        }),
    mealType: z.string().refine((value) => value !== '', {
        message: 'You need to select a meal type',
    }),
    withCalories: z.preprocess((e) => Boolean(e), z.boolean()),
    calories: z.preprocess((e) => Number(e), z.number()).optional(),
    ingredients: z.string().optional(),
    ingredientsImg: z.string().optional(),
    moreIngredients: z.string().optional()
});

export default function MealForm(props: any) {
    const [meal, setMeal] = useState<object>({});
    const [error, setError] = useState<object>({});
    const [completed, setCompleted] = useState(false)
    
    return (
        <div className="w-full">
            {!completed ? <MealPage meal={setMeal} mealError={setError} completed={setCompleted}/> : null}
            {(Object.keys(meal).length || Object.keys(error).length) ? <Meal meal={meal} error={error}/> : null}
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    );
}
