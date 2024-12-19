import React from "react";
import {
    MealDef
} from '../types';

const Meal = (props: MealDef) => {
    if (!props.meal) return
    const { meal } = props

    if (!Object.keys(meal).length) return

    const { mealName, ingredients, instructions, nutritionFacts, totalCalories, extras } = meal
    return (
        <div>
            <h2 className="text-lime-500 text-center font-bold text-3xl py-4">
                {mealName}
            </h2>

        <div className="max-w-xl">
            <div className="flex justify-center flex-col pb-12 text-left">
                <h3 className="text-stone-500 font-bold text-md pt-8 pb-4">
                    Ingredients
                </h3>
                <ul className="list-disc px-4">
                    {ingredients.map((item:string) => (
                        <li>{item}</li>
                    ))}
                </ul>
                <h3 className="text-stone-500 font-bold text-md pt-8 pb-4">
                    Instructions
                </h3>
                <ol className="list-decimal px-4">
                    {instructions.map((item:string) => (
                        <li>{item}</li>
                    ))}
                </ol>
                <h3 className="text-stone-500 font-bold text-md pt-8 pb-4">
                    Nutritional Breakdown
                </h3>
                <ul>
                    {Object.entries(
                        nutritionFacts
                    ).map(([key, value]) => {
                        return (
                            <li>
                                <span className="capitalize font-semibold">{key}:</span> {value}
                            </li>
                        );
                    })}
                </ul>
                <h3 className="text-stone-500 pt-8 pb-4">
                    <strong>Total Calories: </strong>{totalCalories}
                </h3>
                <p>Notes: {extras}</p>
            </div>
            </div>
        </div>
    )
}

export default Meal