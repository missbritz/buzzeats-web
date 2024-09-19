import React from "react";
import { Button } from "./ui/button";

interface nutrifactsItem {
    [key:string]: string
}

interface ErrorDef {
    [key:string]: string
}

interface MealTypeDef {
    mealName: string
    ingredients: string[]
    instructions: string[]
    nutritionFacts: nutrifactsItem
    totalCalories: number
    extras: string
}

interface MealDef {
    meal: MealTypeDef
    error: ErrorDef
}

const Meal = (props: MealDef) => {
    const { meal, error } = props
    const { mealName, ingredients, instructions, nutritionFacts, totalCalories, extras } = meal
    return (
            !Object.keys(error).length ? (
                <div className="max-w-xl">
                    <h2 className="text-lime-500 text-center font-bold text-3xl py-4">
                        {mealName}
                    </h2>
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
                    {/*
                    TO DO:
                        - Authentication integration
                    <div className="flex justify-center">
                        <Button variant="secondary">
                            I don't like this meal. Next please.
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            variant="link"
                            onClick={() => setPageTrail(1, 0)}
                        >
                            Update my preference
                        </Button>
                        <Button variant="link">Save this meal</Button>
                    </div> */}
                </div>
            ) : (
                <div className="text-red-600">
                    <strong>Ooops! Something went wrong!</strong><br/>
                    We are getting <strong>{`${error?.context?.status} ${error?.context?.statusText}`}</strong> error!
                    </div>
            )
    )
}

export default Meal