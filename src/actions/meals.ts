import { MealTypeDef } from "@/components/Meal";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const getMeals = async (slug: string) => {
  
   const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
   const { data, error } = await supabase.from('meals').select().eq('slug', slug);
  
   if (data) {
        return data
   }

   if (error) {
        throw new Error(error.message);
   }

   throw new Error('Unknown error occurred');
   
}

export const deleteMeal = async (mealId: string) => {

     const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
     const { data, error } = await supabase.from('meals').delete().eq('id', mealId)
     
     if (data) {
         return data
     }

     if (error) {
          throw new Error(error.message);
     } 
 
     throw new Error('Unknown error occurred');
}


type mealDataDef = {
     data?: MealTypeDef,
     error?: Error
}

export const generateMeal = async (params:any) => {
     const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
     const { data, error } = await supabase.functions.invoke('openai', {
          body: JSON.stringify(params),
     });

     const mealData:mealDataDef = {
          data: data,
          error: error
     };

     if (!data) {
          delete mealData.data
     }

     if (!error) {
          delete mealData.error
     }

     return mealData
}