import Meal from '@/components/Meal';
import { getMeals } from '@/actions/meals';
import { slugify } from '../../../../../utils/utils';

async function getMealInfo (slug: string) {

  const meals = await getMeals();

  if (!meals) return []

  return meals.length && meals?.filter(meal => {
    return slugify(meal.mealName) === slug
  })

}

export default async function Meals({ params }: { params: { meal: string } }) {

    const getMeal = await getMealInfo(params.meal) || []
    const singleMeal = Object.assign({}, getMeal.length ? getMeal[0] : {})

    return (
      singleMeal && <Meal meal={singleMeal}/>
    );
}
