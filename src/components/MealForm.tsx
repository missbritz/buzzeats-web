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
import { createClient } from "@supabase/supabase-js";

const FormSchema = z.object({
    allergen: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    mealType: z.string().refine((value => value !== ''), {
        message: "You need to select a meal type"
      }),
    withCalories: z.boolean(),
    calories: z.preprocess(e => Number(e), z.number()).optional(),
    ingredients: z.array(z.string()).optional(),
    moreIngredients: z.string().optional(),
    ingredientsImg: z.string().optional()
  })

export default function MealForm (props:any){

    const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_ENDPOINT || ''
    const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const SUPABASE_IMG_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMG_BUCKET || ''

    const supabase = createClient(SUPABASE_ENDPOINT, SUPABASE_KEY)
    const [page, setPage] = useState(0)
    const [prevPage, setPrevPage] = useState(0)
    const [progress, setProgress] = useState({})
    const [selectedMeal, setselectedMeal] = useState('')
    const [allergen, setAllergen] = useState([])
    const [withCalorieMeal, setwithCalorieMeal] = useState(false)
    const [customIng, setCustomIng] = useState([])
    const [includedIng, setIncludedIng] = useState('')
    const [hasImgIng, sethasImgIng] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          allergen: [],
          mealType: '',
          calories: 0,
          withCalories: false,
          ingredients: [],
          moreIngredients: '',
          ingredientsImg: ''
        }
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

    const processIngredients = (data: any) => {
        const scannedIng = data.target.value
        const newIngredients = scannedIng.split(',').map(i => i.trim())
        console.log(newIngredients)
        form.setValue('ingredients', newIngredients)
        consolidateIngredients(newIngredients)
    }

    const processIngredientsImg = async (event:any) => {
        const file = event.target.files[0];
        const bucket = SUPABASE_IMG_BUCKET
    
        // Call Storage API to upload file
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(file.name, file);
    
        // Handle error if upload failed
        if(error) {
          console.log(error)
          return;
        }

        //Retrieve image
        // setIncludedIng(retrieveImage(data))
        form.setValue('ingredientsImg', retrieveImage(data))
    }

    const retrieveImage = (image: any) => {
        const bucket = SUPABASE_IMG_BUCKET
        const { data } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(image.path)

        return data.publicUrl || ''
    }

    const consolidateIngredients = (ing:string[]) => {
        if(!ing.length) return

        const allIng:any = []

        ing.map((item, index) => {
            if(allIng.filter(a => a.value !== item)) {
                allIng.push({
                    label: item,
                    id: item
                })
            }
            return
        })
        console.log(allIng)
        setCustomIng(allIng)
    }

    const checkCalories = (e: number) => {
        const newCal = parseInt(e)
        if(newCal === 0) {
            form.trigger("calories")
        } else {
            form.setValue('calories', newCal)
        }
    }

    const setCheckBoxFn = (data:any, item:any, checked:boolean, stateFn: any) => {

        const newVal = checked ?
            [...data.value, item.id] :
                data.value?.filter((value:any) => value !== item.id
        )

        stateFn(newVal)

        return data.onChange(newVal)
    }

    const setCalorieBtn = (addCalorie: boolean, fn:any) => {

        if (addCalorie) {
            setwithCalorieMeal(true)
            form.setValue('withCalories', true)
        } else {
            setwithCalorieMeal(false)
            form.setValue('withCalories', false)
            form.setValue('calories', 0)
        }

        fn()
    }

    function isSubmitted(e:any) {
        sethasImgIng(false)
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
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="flex flex-col items-center justify-center p-5">
                            <div className="flex flex-col items-center justify-center md:flex-row p-5">
                                <FormField
                                    control={form.control}
                                    name="ingredients"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormControl>
                                            <Input type="text" {...field} placeholder="My kitchen has..." className="md:mr-5 w-72" onChangeCapture={e => processIngredients(e)} />
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
                                            <Input type="file" className="md:mr-5 md:mt-0 mt-5 w-72" {...field} onChangeCapture={e => processIngredientsImg(e)}/>
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
                                                <Input type="text" {...field}/>
                                            </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
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
                                    <Input type="text" className="md:mr-5 w-72" onChangeCapture={(e) => checkCalories(e.target.value)} placeholder="My calorie intake is..." {...field}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button onClick={() => setPageTrail(page + 1, page)} className="m-5 md:m-0" type="button" disabled={Number(form.getValues('calories')) > 0 ? false : true}>
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
                    <Button onClick={() => setPageTrail(page + 1, page)} className="mt-5" type="button" disabled={form.getValues('mealType') !== '' ? false : true}>
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
                                            onCheckedChange={(checked) => setCheckBoxFn(field, item, checked, () => setAllergen())}
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
                    <Button onClick={() => setPageTrail(page + 1, page)} className="mt-5" type="submit" disabled={form.getValues('allergen').length > 0 ? false : true}>
                        Go
                    </Button>
                </div>
                <div className={page === 7 ? `block` : `none`}>
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
