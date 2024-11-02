import { MealTypeDef } from "@/components/Meal";
import { deconstructArr } from "@/lib/utils";
import { deleteMeal } from "./meals";
import API from '../api';

export const saveMeal = async (meal: MealTypeDef, user:string) => {
  
    const { data, error } = await API.SAVE_MEAL(meal)
    
    if (error) {
        throw new Error(error.message);
    }

    if (data) {
        return await saveUserMeal(data[0].id, user);
    }

    throw new Error('Unknown error occurred');
}

export const saveUserMeal = async (mealId:string, userId:string) => {
  
    const { data, error } = await API.SAVE_USER_MEAL(mealId, userId)
    
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

export const getUserMeals = async (userId: string) => {
    const { data, error } = await API.GET_USER_MEALS(userId)

    if (data) {
        return getMeals(deconstructArr(data))
    }

    if (error) {
        throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
}


export interface UserMealId {
    mealId: number
}

export const getMeals = async (mealId: UserMealId[]) => {
    const { data, error } = await API.GET_MEALS_BY_ID(mealId)

    if (data) {
        return data
    }

    if (error) {
        throw new Error(error.message);
    }

    throw new Error('Unknown error occurred');
}