import { MealTypeDef } from "@/components/Meal";
import { deconstructArr } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";
import { slugify } from "../../utils/utils";
import { deleteMeal } from "./meals";

const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const saveMeal = async (meal: MealTypeDef, user:string) => {
  
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').insert({...meal, slug: slugify(meal.mealName)}).select('id');
    
    if (error) {
        throw new Error(error.message);
    }

    if (data) {
        return await saveUserMeal(data[0].id, user);
    }

    throw new Error('Unknown error occurred');
}

export const saveUserMeal = async (mealId:string, userId:string) => {
  
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('user_meals').insert({
        meal_id: mealId,
        user_id: userId
    });
    
    if (data) {
        console.log(data, 'User meal saved successful')
        return 'User meal saved successfully!'
    }

    if (error) {
        deleteMeal(mealId)
        throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
}

interface UserMealId {
    mealId: number
}

export const getUserMeals = async (userId: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('user_meals').select('meal_id').eq('user_id', userId);

    if (data) {
        return getMeals(deconstructArr(data))
    }

    if (error) {
        throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
}

export const getMeals = async (mealId: UserMealId[]) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').select().in('id', mealId);

    if (data) {
        return data
    }

    if (error) {
        throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
}