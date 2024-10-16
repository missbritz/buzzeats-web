import { createClient } from "@supabase/supabase-js";

const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const getMeals = async () => {
  
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
   const { data, error } = await supabase.from('meals').select();
  
   if (data) {
        return data
   }

   if (error) {
        console.log(error)
        return []
   }
   
}