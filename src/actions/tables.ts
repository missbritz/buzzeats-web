import { MealTypeDef } from "@/components/Meal";
import { deconstructArr } from "@/lib/utils";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const saveMeal = async (meal: MealTypeDef, user:string) => {
  
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').insert({...meal}).select('id');
    
    if (data) {
            return saveUserMeal(data[0].id, user)
    }

    if (error) {
            console.log(error)
            return 'Ooops something went wrong!'
    }
   
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
            console.log(error)
            return 'Ooops something went wrong!'
        }
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
            console.log(error)
            return 'Ooops something went wrong!'
        }
}

export const getMeals = async (mealId: UserMealId[]) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').select().in('id', mealId);

    if (data) {
            return data
        }

        if (error) {
            console.log(error)
            return 'Ooops something went wrong!'
        }
}