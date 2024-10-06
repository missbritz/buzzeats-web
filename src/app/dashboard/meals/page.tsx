'use client';

import Meal from '@/components/Meal';

const MealJson = {
    "mealName": "Grilled Chicken Salad with Watermelon and Rockmelon",
    "ingredients": [
      "200 grams grilled chicken breast",
      "1 cup mixed salad greens",
      "1 cup diced watermelon",
      "1 cup diced rockmelon",
      "1/2 cucumber, sliced",
      "1/4 red onion, thinly sliced",
      "1 tablespoon olive oil",
      "1 tablespoon balsamic vinegar",
      "Salt to taste",
      "Pepper to taste",
      "1 tablespoon feta cheese (optional)"
    ],
    "instructions": [
      "Grill the chicken breast until cooked through and let it rest for a few minutes before slicing.",
      "In a large bowl, combine the mixed salad greens, diced watermelon, diced rockmelon, sliced cucumber, and red onion.",
      "Drizzle the olive oil and balsamic vinegar over the salad, and toss gently to combine.",
      "Season with salt and pepper to taste.",
      "Top the salad with the grilled chicken slices and sprinkle with feta cheese if desired.",
      "Serve immediately and enjoy your refreshing meal."
    ],
    "totalCalories": 600,
    "nutritionFacts": {
      "protein": "45 grams",
      "carbohydrates": "45 grams",
      "fat": "25 grams",
      "fiber": "5 grams",
      "sugar": "15 grams"
    },
    "extras": "This meal is refreshing and perfect for warm weather. The combination of fruits adds a natural sweetness and is rich in vitamins."
}

const meal = JSON.parse(JSON.stringify(MealJson))

export default function Meals() {
    return (
        <Meal meal={meal}/>
    );
}
