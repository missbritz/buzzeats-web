import Meal from '@/components/Meal';
import { getMeals } from '@/actions/meals';

export const dynamic = 'force-dynamic';

async function getMealInfo (slug: string) {

  const meals = await getMeals(slug);

  if (!meals) return []

  return meals

}

export default async function Meals({ params }: { params: { meal: string } }) {

    const getMeal = await getMealInfo(params.meal) || []
    const singleMeal = Object.assign({}, getMeal.length ? getMeal[0] : {})

    return singleMeal ? <Meal meal={singleMeal} /> : <p>Meal not found</p>;
}
