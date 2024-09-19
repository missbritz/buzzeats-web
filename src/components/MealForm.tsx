'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { sectionTitle, allergenItems } from '@/config/constants';
import { createClient } from '@supabase/supabase-js';
import Meal from './Meal';

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

export default function MealForm(props: any) {
    const { activeTitle } = props;

    const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || '';
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const SUPABASE_IMG_BUCKET =
        process.env.NEXT_PUBLIC_SUPABASE_IMG_BUCKET || '';

    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY);
    const [page, setPage] = useState<number>(0);
    const [prevPage, setPrevPage] = useState<number>(0);
    const [meal, setMeal] = useState<object>({});
    const [error, setError] = useState<object>({});

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

    const { handleSubmit } = form;

    useEffect(() => {
        if(page) activeTitle(sectionTitle[page]);
    }, [page, activeTitle]);

    const setPageTrail = (
        goTo: number,
        current: number
    ) => {
        if (!current && !goTo) {
            setPrevPage(0);
            setPage(1);
            return;
        }

        setPage(goTo);
        setPrevPage(current);
    };

    const processIngredients = (data: any) => {
        const scannedIng = data;
        const newIngredients = scannedIng
            .split(',')
            .map((i:string) => i.trim())
            .filter((r:string) => r);
        return newIngredients;
    };

    const processIngredientsImg = async (event: any) => {
        const file = event.target.files[0];
        const bucket = SUPABASE_IMG_BUCKET;

        // Call Storage API to upload file
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(file.name, file);

        // Handle error if upload failed
        if (error) {
            console.log(error);
            return;
        }

        //Retrieve image
        form.setValue('ingredientsImg', retrieveImage(data));
    };

    const retrieveImage = (image: any) => {
        const bucket = SUPABASE_IMG_BUCKET;
        const { data } = supabase.storage.from(bucket).getPublicUrl(image.path);

        return data.publicUrl || '';
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

    const setCalorieBtn = (addCalorie: boolean, fn: () => void) => {
        if (addCalorie) {
            form.setValue('withCalories', true);
        } else {
            form.setValue('withCalories', false);
            form.setValue('calories', 0);
        }

        fn();
    };

    async function isSubmitted(e: any) {
        const ingredientsArr = processIngredients(e.ingredients);
        const params = {
            ...e,
            ingredients: ingredientsArr,
        };
        const { data, error } = await supabase.functions.invoke('openai', {
            body: JSON.stringify(params),
        });

        setMeal(data && Object.keys(data).length ? data : {})
        setError(error ? error : {})
    }

    return (
        <div className="w-full">
            <div>
                <Form {...form}>
                    <form onSubmit={handleSubmit(isSubmitted)}>
                        <div className={page === 0 ? `block` : `none`}>
                            <div className="flex flex-col items-center justify-center md:flex-row p-5">
                                <Button
                                    onClick={() => setPageTrail(page + 1, page)}
                                    className="m-5 md:m-0"
                                    type="button"
                                >
                                    Let's get cooking!
                                </Button>
                            </div>
                        </div>
                        <div className={page === 1 ? `block` : `none`}>
                            <div className="flex flex-col items-center justify-center md:flex-row p-5">
                                <Button
                                    onClick={() => setPageTrail(page + 1, page)}
                                    className="md:mr-5"
                                    type="button"
                                >
                                    Yesss! I have some ingredients
                                </Button>
                                <Button
                                    onClick={() => setPageTrail(3, 1)}
                                    className="m-5 md:m-0"
                                    type="button"
                                >
                                    No, but i’ll get them
                                </Button>
                            </div>
                        </div>
                        <div className={page === 2 ? `block` : `none`}>
                            <div className="flex flex-col items-center justify-center p-5">
                                <div className="flex flex-col items-center justify-center p-5">
                                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
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
                                                            className="md:mr-5 w-72"
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
                                        <FormField
                                            control={form.control}
                                            name="moreIngredients"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            className="md:mr-5 md:mt-0 mt-5 w-72"
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
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setPageTrail(page + 1, page)}
                                    className="m-5 md:m-0"
                                    type="button"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className={page === 3 ? `block` : `none`}>
                            <div className="flex flex-col items-center justify-center md:flex-row p-5">
                                <Button
                                    onClick={() =>
                                        setCalorieBtn(true, () =>
                                            setPageTrail(page + 1, page)
                                        )
                                    }
                                    className="md:mr-5 w-72"
                                    type="button"
                                >
                                    Yesss, please!
                                </Button>
                                <Button
                                    onClick={() =>
                                        setCalorieBtn(false, () =>
                                            setPageTrail(5, page)
                                        )
                                    }
                                    className="m-5 md:m-0"
                                    type="button"
                                >
                                    Nahh, but I don't track my calorie intake
                                </Button>
                            </div>
                        </div>
                        <div className={page === 4 ? `block` : `none`}>
                            <div className="flex flex-col items-center justify-center md:flex-row p-5">
                                <FormField
                                    control={form.control}
                                    name="withCalories"
                                    render={({ field }) => (
                                        <FormItem className="none">
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="calories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    className="md:mr-5 w-72"
                                                    onChangeCapture={(e) =>
                                                        checkCalories(
                                                            e.target.value
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
                                <Button
                                    onClick={() => setPageTrail(page + 1, page)}
                                    className="m-5 md:m-0"
                                    type="button"
                                    disabled={
                                        Number(form.getValues('calories')) > 0
                                            ? false
                                            : true
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className={page === 5 ? `block` : `none`}>
                            <br />
                            <FormField
                                control={form.control}
                                name="mealType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
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
                            <Button
                                onClick={() => setPageTrail(page + 1, page)}
                                className="mt-5"
                                type="button"
                                disabled={
                                    form.getValues('mealType') !== ''
                                        ? false
                                        : true
                                }
                            >
                                Next
                            </Button>
                        </div>
                        <div className={page === 6 ? `block` : `none`}>
                            <br />
                            <FormField
                                control={form.control}
                                name="allergen"
                                render={() => (
                                    <FormItem>
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
                                                                            checked
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
                            <Button
                                onClick={() => setPageTrail(page + 1, page)}
                                className="mt-5"
                                type="submit"
                                disabled={
                                    form.getValues('allergen').length > 0
                                        ? false
                                        : true
                                }
                            >
                                Go
                            </Button>
                        </div>
                        <div className={page === 7 ? `block` : `none`}>
                            <div>
                                {console.log(form.getValues())}
                                {console.log(form.formState)}
                                {form.formState && form.formState.isSubmitted ? (
                                    <div>
                                        <Meal meal={meal} error={error}/>
                                    </div>
                                ) : (
                                    <div>...loading</div>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
                {prevPage >= 1 && prevPage < 6 ? (
                    <Button
                        variant="ghost"
                        onClick={() => setPageTrail(prevPage, page)}
                    >
                        Back
                    </Button>
                ) : (
                    ''
                )}
            </div>
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    );
}
