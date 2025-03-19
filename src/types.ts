export interface nutrifactsItem {
    [key:string]: string
}
export interface ErrorDef {
    [key:string]: string
}

export interface MealTypeDef {
    mealName: string
    ingredients: string[]
    instructions: string[]
    nutritionFacts: nutrifactsItem
    totalCalories: number
    extras: string
}

export interface SavedMealTypeDef {
    id: string
    mealName: string
    ingredients: string[]
    instructions: string[]
    nutritionFacts: nutrifactsItem
    totalCalories: number
    extras: string
    mealType: string
    created_at: string
}

export interface MealDef {
    meal: MealTypeDef | undefined
}

export type MessageDef = {
    message: string
    state: string
}

export type UserTypeDef = 'anon' | 'auth'

export interface UserNavigationDef {
    userType: UserTypeDef,
    menu: {
        [key:string]: {
            title: string
            href: string
        }[]
    }
}

export type Message = {
    success?: string | null;
    error?: string | null;
    message?: string | null;
};

export type mealDataDef = {
    data?: MealTypeDef,
    error?: Error
}

export interface UserMealId {
    mealId: number
}

export interface GenerateMealParams {
    ingredients?: string;
    mealType?: string;
    calories?: number;
    allergens?: string[];
}