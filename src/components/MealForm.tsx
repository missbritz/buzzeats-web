"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { z } from "zod";
import { useEffect, useState } from "react";
import { sectionTitle, allergenItems } from "@/config/constants";

const FormSchema = z.object({
    allergen: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    mealType: z.string().refine((value => value !== ''), {
        message: "You need to select a meal type"
      }),
    withCalories: z.boolean(),
    calories: z.number().optional(),
  }).refine(data => data.withCalories && data.calories === 0, {
    message: 'Ooops! You forgot your estimated calories for this meal'
  })

export default function MealForm (props:any){
    const [page, setPage] = useState(0)
    const [prevPage, setPrevPage] = useState(0)
    const [progress, setProgress] = useState({})
    const [selectedMeal, setselectedMeal] = useState('')
    const [allergen, setAllergen] = useState([])
    const [withCalorieMeal, setwithCalorieMeal] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          allergen: [],
          mealType: '',
          calories: 0,
          withCalories: false
        },
      })
    
    useEffect(() => {
        props.activeTitle(sectionTitle[page])
    }, [page])

    const setPageTrail = (goTo:number|undefined = undefined, current:number|undefined = undefined) => {

        if(!current && !goTo) {
            setPrevPage(0)
            setPage(1)
            return
        }

        setPage(goTo)
        setPrevPage(current)
    }

    // const setIngredients = (data: any) => {
    //     return {
    //         ingredients: data
    //     }
    // }

    const setAllergenFn = (data:any, item:any, checked:boolean) => {

        const newVal = checked ?
            [...data.value, item.id] :
                data.value?.filter((value:any) => value !== item.id
        )

        setAllergen(newVal)

        return data.onChange(newVal)
    }

    const setCalorieBtn = (addCalorie: boolean, fn:any) => {

        if (addCalorie) {
            setwithCalorieMeal(true)
            form.setValue('withCalories', true)
        } else {
            setwithCalorieMeal(false)
            form.setValue('withCalories', false)
        }

        fn()
    }

    // const setCalories = (data: any) => {
    //     return {
    //         calories: data > 0 ? data : 0
    //     }
    // }

    // const setProgressData = (data: any) => {

    //     // const newData = {
    //     //     ingredients: data.calories,
    //     //     calories: data.calories,
    //     //     mealType: data.mealType,
    //     //     allergens: ''
    //     // }

    //     setProgress({
    //         ...progress,
    //         ...data
    //     })
    // }

    function isSubmitted(e:any) {
        console.log(JSON.stringify(e));
    }

    return (
        <div className="w-full">
            <div>
                <Form  {...form}>
                <form onSubmit={form.handleSubmit(isSubmitted)}>
                <div className={page === 0 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPageTrail(page + 1, page)} className="m-5 md:m-0" type="button">
                            Let's get cooking!
                        </Button>
                    </div>
                </div>
                <div className={page === 1 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPageTrail(page + 1, page)} className="md:mr-5" type="button">
                            Yesss! I have some ingredients
                        </Button>
                        <Button onClick={() => setPageTrail(3, 1)} className="m-5 md:m-0" type="button">
                            No, but i’ll get them
                        </Button>
                    </div>
                </div>
                <div className={page === 2 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        {/* <Input type="text" placeholder="My kitchen has..." className="md:mr-5 w-72"/>
                        <Input type="file" className="md:mr-5 md:mt-0 mt-5 w-72"/> */}
                        <Button onClick={() => setPageTrail(page + 1, page)} className="m-5 md:m-0" type="button">
                        Next
                        </Button>
                    </div>
                </div>
                <div className={page === 3 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setCalorieBtn(true, () => setPageTrail(page + 1, page))} className="md:mr-5 w-72"  type="button">
                            Yesss, please!
                        </Button>
                        <Button onClick={() => setCalorieBtn(false, () => setPageTrail(5, page))} className="m-5 md:m-0" type="button">
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
                                    <Input type="text" {...field}/>
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
                                    <Input type="text" className="md:mr-5 w-72" placeholder="My calorie intake is..." {...field}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button onClick={() => setPageTrail(page + 1, page)} className="m-5 md:m-0" type="button">
                            Next
                        </Button>
                    </div>
                </div>
                <div className={page === 5 ? `block` : `none`}>
                    <br/>
                    <FormField
                        control={form.control}
                        name="mealType"
                        render={({field}) => (
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
                                            <RadioGroupItem value="breakfast" id="breakfast" checked={field.value === "breakfast"}/>
                                            <Label htmlFor="breakfast">Breakfast</Label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="brunch" id="brunch" checked={field.value === "brunch"}/>
                                            <Label htmlFor="brunch">Brunch</Label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="lunch" id="lunch" checked={field.value === "lunch"}/>
                                            <Label htmlFor="lunch">Lunch</Label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="dinner" id="dinner" checked={field.value === "dinner"}/>
                                            <Label htmlFor="dinner">Dinner</Label>
                                        </div>
                                    </FormControl>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button onClick={() => setPageTrail(page + 1, page)} className="mt-5" type="button">
                       Next
                    </Button>
                </div>
                <div className={page === 6 ? `block` : `none`}>
                    <br/>
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
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => setAllergenFn(field, item, checked)}
                                        />
                                        </FormControl>
                                        <FormLabel className="text-stone-400 font-normal">
                                        {item.label}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button onClick={() => setPageTrail(page + 1, page)} className="mt-5" type="submit">
                        Go
                    </Button>
                </div>
                <div className={page === 7 ? `block` : `none`}>
                    {console.log(form)}
                    <div className="flex justify-center flex-col pb-12">
                    <h2 className="text-lime-500 font-bold text-xl py-4">Grilled Chicken with Quinoa Salad and Blackberry Vinaigrette</h2>
                        <h3 className="text-stone-500 font-bold text-md py-4">Ingredients</h3>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                            <li>Item 6</li>
                        </ul>
                        <h3 className="text-stone-500 font-bold text-md py-4">Instructions</h3>
                        <ol>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                            <li>Item 5</li>
                            <li>Item 6</li>
                        </ol>
                        <h3 className="text-stone-500 font-bold text-md py-4">Nutritional Breakdown</h3>
                        <ul>
                            <li>Item 1</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="secondary">I don't like this meal. Next please.</Button>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="link" onClick={() => setPageTrail()}>Update my preference</Button>
                        <Button variant="link">Save this meal</Button>
                    </div>
                </div>
                </form>
                </Form>
                {prevPage >= 1 && prevPage < 6 ? <Button variant="ghost" onClick={() => setPageTrail(prevPage, page)}>Back</Button> : ''}
            </div>
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    )
}
