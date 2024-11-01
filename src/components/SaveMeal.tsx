import { useState } from "react";
import { MealTypeDef, MessageDef } from './Meal';
import { Button } from "./ui/button"
import { saveMeal } from '@/actions/tables';

export default function SaveMeal ({ user, meal}: { user: any, meal: MealTypeDef }) {
    const [message, setMessage] = useState<MessageDef>(''); 

    const SaveMealFn = (meal:MealTypeDef, userId: string) => {
        const saveMealData = saveMeal(meal, userId);
        setMessage(saveMealData)
    }
    
    return (
        <div>
        { user ? (
            <div>
                <Button onClick={() => SaveMealFn(meal, user.user_metadata.sub)}>Save this meal</Button>
                <p>{message}</p>
            </div>
            ) : <></>
        }
        </div>
    )
}