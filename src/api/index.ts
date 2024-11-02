import { MealTypeDef, UserMealId } from "../types";
import { createClient } from "@supabase/supabase-js";
import { slugify } from "../../utils/utils";

const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const GET_MEALS_BY_SLUG = async (slug: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').select().eq('slug', slug);
    return {
        data,
        error
    }
}

const GET_MEALS_BY_ID = async (mealId: UserMealId[]) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').select().in('id', mealId);
    return {
        data,
        error
    }
}

const GET_USER_MEALS = async (userId: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('user_meals').select('meal_id').eq('user_id', userId); 
    return {
        data,
        error
    }
}

const SAVE_MEAL = async (meal: MealTypeDef) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').insert({...meal, slug: slugify(meal.mealName)}).select('id');
    return {
        data,
        error
    }
}

const DELETE_MEAL = async (mealId: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('meals').delete().eq('id', mealId)    
    return {
        data,
        error
    }
}

const SAVE_USER_MEAL = async (mealId: string, userId: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.from('user_meals').insert({
        meal_id: mealId,
        user_id: userId
    });
    return {
        data,
        error
    }
}


const GENERATE_MEAL = async (params: any) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { data, error } = await supabase.functions.invoke('openai', {
        body: JSON.stringify(params),
   });  
    return {
        data,
        error
    }
}

const USER_SIGNIN = async (email: string, password: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return {
        error
    }
}

const USER_FORGOTPASSWORD = async (origin: string | null, path: string, email: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}${path}`,
    });

    return {
        error
    }
}

const USER_UPDATE = async (password: string) => {
    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    return {
        error
    }
}

const API = {
    GET_MEALS_BY_SLUG,
    DELETE_MEAL,
    GENERATE_MEAL,
    SAVE_MEAL,
    SAVE_USER_MEAL,
    GET_USER_MEALS,
    GET_MEALS_BY_ID,
    USER_SIGNIN,
    USER_FORGOTPASSWORD,
    USER_UPDATE
}


export default API