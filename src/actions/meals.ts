import { mealDataDef } from "../types";
import API from '../api'

export const getMeals = async (slug: string) => {

   const { data, error } = await API.GET_MEALS_BY_SLUG(slug)
  
   if (data) {
        return data
   }

   if (error) {
        throw new Error(error.message);
   }

   throw new Error('Unknown error occurred');
   
}

export const deleteMeal = async (mealId: string) => {

     const { data, error } = await API.DELETE_MEAL(mealId)
     
     if (data) {
         return data
     }

     if (error) {
          throw new Error(error.message);
     } 
 
     throw new Error('Unknown error occurred');
}

export const generateMeal = async (params:any) => {
     const { data, error } = await API.GENERATE_MEAL(params)

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