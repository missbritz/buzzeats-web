'use client';

import { Button } from './ui/button';
import Meal from './Meal';
import MealPage from './MealPage';

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
