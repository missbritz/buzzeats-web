import React, { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import { createClient } from "@supabase/supabase-js";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { allergenItems } from "@/config/constants";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { generateMeal } from "@/actions/meals";

const FormSchema = z.object({
    allergen: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: 'You have to select at least one item.',
        }),
    mealType: z.string().refine((value) => value !== '', {
        message: 'You need to select a meal type',
    }),
    withCalories: z.preprocess((e) => Boolean(e), z.boolean()),
    calories: z.preprocess((e) => Number(e), z.number()).optional(),
    ingredients: z.string().optional(),
    ingredientsImg: z.string().optional(),
    moreIngredients: z.string().optional()
});

const MealPage = ({ meal, mealError, completed }: any) => {
    const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const SUPABASE_IMG_BUCKET =
        process.env.NEXT_PUBLIC_SUPABASE_IMG_BUCKET || '';

    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);

    const [imageUploadFailed, setImageUploadFailed] = useState<boolean>(false)

    useEffect(() => {
        completed(false)
        meal({})
        mealError({})
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            allergen: [],
            mealType: '',
            calories: 0,
            withCalories: false,
            ingredients: '',
            ingredientsImg: '',
            moreIngredients: ''
        },
    });

    const processIngredients = (data: any) => {
        const scannedIng = data;
        const newIngredients = scannedIng
            .split(',')
            .map((i:string) => i.trim())
            .filter((r:string) => r);
        return newIngredients;
    };

    const retrieveImage = (image: any) => {
        const bucket = SUPABASE_IMG_BUCKET;
        const { data } = supabase.storage.from(bucket).getPublicUrl(image.path);

        return data.publicUrl || '';
    };

    const processIngredientsImg = async (event: any) => {
        setImageUploadFailed(false)
        const file = event.target.files[0];
        const bucket = SUPABASE_IMG_BUCKET;

        // Call Storage API to upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(file.name, file);

        // Handle error if upload failed
        if (error) {
            console.log(error);
            setImageUploadFailed(true)
            form.setError("moreIngredients", { type: "custom", message: "Uh oh! Please choose another image." })
            return;
        }

        //Retrieve image
        form.setValue('ingredientsImg', retrieveImage(data));
        form.clearErrors("moreIngredients")
    };

    const checkCalories = (e: number) => {
        const newCal = Number(e);
        if (newCal === 0) {
            form.trigger('calories');
        } else {
            form.setValue('calories', newCal);
        }
    };

    const setCheckBoxFn = (
        data: any,
        item: any,
        checked: boolean
    ) => {
        const newVal = checked
            ? [...data.value, item.id]
            : data.value?.filter((value: any) => value !== item.id);

        return data.onChange(newVal);
    };

    async function isSubmitted(e: any) {
        const ingredientsArr = processIngredients(e.ingredients);
        const params = {
            ...e,
            ingredients: ingredientsArr,
        };

        let mealData, mealErr;
        try{
            const { data, error } = await generateMeal(params)
            if (error) {
                throw new Error(error)
            }
            mealData = data
        } catch(err) {
            mealErr = err
        }

        meal(mealData && Object.keys(mealData).length ? mealData : {})
        mealError(mealErr ? mealErr : {})
        completed(true)
    }

    const { handleSubmit } = form;

    return (
        <div>
        {!form.formState.isSubmitting ? (
            <Form {...form}>
                <form onSubmit={handleSubmit(isSubmitted)}>
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="flex flex-col items-center justify-center p-5">
                            <h3 className="text-stone-400 px-5 pb-5 font-bold">
                                Do you have your preferred ingredients?
                            </h3>
                            <FormField
                                control={form.control}
                                name="ingredients"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="My kitchen has..."
                                                className="w-72"
                                                onChangeCapture={(
                                                    e
                                                ) => {
                                                        const textInput = e.target as HTMLTextAreaElement;
                                                        form.setValue(
                                                            'ingredients',
                                                            textInput.value
                                                        )
                                                    }
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <span className="text-xs font-normal text-stone-400 pt-5">You may upload a photo of your ingredients.</span>
                            <FormField
                                control={form.control}
                                name="moreIngredients"
                                render={({ field }) => (
                                    <FormItem className="pt-5">
                                        <FormControl>
                                            <Input
                                                type="file"
                                                className="md:mt-0 mt-5 w-72"
                                                {...field}
                                                onChangeCapture={(
                                                    e
                                                ) =>
                                                    processIngredientsImg(
                                                        e
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ingredientsImg"
                                render={({ field }) => (
                                    <FormItem className="none">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h3 className="text-stone-400 px-5 pt-10 pb-5 font-bold">
                                What is your estimated caloric intake?
                            </h3>
                            <FormField
                                control={form.control}
                                name="calories"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="w-72"
                                                onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    checkCalories(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                placeholder="My calorie intake is..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h3 className="text-stone-400 px-5 pt-10 pb-5 font-bold">
                                What meal are you making for?**
                            </h3>
                            <div className="w-full px-5 text-left">
                            <FormField
                                control={form.control}
                                name="mealType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3 px-10">
                                        <FormControl>
                                            <RadioGroup
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="breakfast"
                                                                id="breakfast"
                                                                checked={
                                                                    field.value ===
                                                                    'breakfast'
                                                                }
                                                            />
                                                            <Label htmlFor="breakfast">
                                                                Breakfast
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="brunch"
                                                                id="brunch"
                                                                checked={
                                                                    field.value ===
                                                                    'brunch'
                                                                }
                                                            />
                                                            <Label htmlFor="brunch">
                                                                Brunch
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="lunch"
                                                                id="lunch"
                                                                checked={
                                                                    field.value ===
                                                                    'lunch'
                                                                }
                                                            />
                                                            <Label htmlFor="lunch">
                                                                Lunch
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value="dinner"
                                                                id="dinner"
                                                                checked={
                                                                    field.value ===
                                                                    'dinner'
                                                                }
                                                            />
                                                            <Label htmlFor="dinner">
                                                                Dinner
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                                <h3 className="text-stone-400 px-5 pt-10 pb-5 font-bold">
                                    Do you diet restrictions or allergens?**
                                </h3>
                                <div className="w-full px-5 text-left">
                                    <FormField
                                        control={form.control}
                                        name="allergen"
                                        render={() => (
                                            <FormItem className="space-y-3 px-10">
                                                {allergenItems.map((item) => (
                                                    <FormField
                                                        key={item.id}
                                                        control={form.control}
                                                        name="allergen"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem
                                                                    key={item.id}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            className="text-stone-400"
                                                                            checked={field.value?.includes(
                                                                                item.id
                                                                            )}
                                                                            onCheckedChange={(
                                                                                checked
                                                                            ) =>
                                                                                setCheckBoxFn(
                                                                                    field,
                                                                                    item,
                                                                                    Boolean(checked)
                                                                                )
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="text-stone-400 font-normal">
                                                                        {item.label}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                        </div>
                        <span className="text-xs font-bold text-stone-400">**required</span>
                        <Button
                            className="m-10"
                            type="submit"
                            disabled={imageUploadFailed}
                        >
                            Let's get cooking!
                        </Button>
                    </div>
                </form>
            </Form>
        ) : (
            <p>...loading</p>
        )}
        </div>
    )
}

export default MealPage