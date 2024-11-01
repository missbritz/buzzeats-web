import { useState } from "react";
import { MealTypeDef } from './Meal';
import { Button } from "./ui/button"
import { saveMeal } from '@/actions/tables';
import Message, { MessageDef } from "./Message";



export default function SaveMeal({ user, meal, setCompleted }: { user: any; meal: MealTypeDef; setCompleted: (value: boolean) => void }) {
    const [message, setMessage] = useState<MessageDef>({message: '', state: ''});

    const SaveMealFn = async (meal: MealTypeDef, userId: string) => {
        try {
            const callSaveMeal = await saveMeal(meal, userId);
            setMessage({ message: 'Meal saved successfully!', state: 'success' });
            setCompleted(true);
            return callSaveMeal
        } catch (error) {
            setMessage({ message: (error as Error).message, state: 'error' });
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <Button onClick={() => SaveMealFn(meal, user.user_metadata.sub)} disabled={message.state === 'success' ? true : false}>Save this meal</Button>
                    <Message {...message} />
                </div>
            ) : null}
        </div>
    );
}