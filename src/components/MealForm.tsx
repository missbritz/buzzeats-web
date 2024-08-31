"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { z } from "zod";
import { useEffect, useState } from "react";
import { sectionTitle, allergenItems } from "@/config/constants";

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })

export default function MealForm (props:any){
    const [page, setPage] = useState(0)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          items: ["recents", "home"],
        },
      })
    
    useEffect(() => {
        props.activeTitle(sectionTitle[page])
    }, [page])

    return (
        <div className="w-full">
            <div>
                <Form {...form}>
                <div className={page === 0 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPage(1)} className="m-5 md:m-0">
                            Let's get cooking!
                        </Button>
                    </div>
                </div>
                <div className={page === 1 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPage(page + 1)} className="md:mr-5">
                            Yesss! I have some ingredients
                        </Button>
                        <Button onClick={() => setPage(3)} className="m-5 md:m-0">
                            No, but i’ll get them
                        </Button>
                    </div>
                </div>
                <div className={page === 2 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Input type="text" placeholder="My kitchen has..." className="md:mr-5 w-72"/>
                        <Input type="file" className="md:mr-5 md:mt-0 mt-5 w-72"/>
                        <Button onClick={() => setPage(page + 1)} className="m-5 md:m-0">
                        Next
                        </Button>
                    </div>
                </div>
                <div className={page === 3 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPage(page + 1)} className="md:mr-5 w-72">
                            Yesss, I do!
                        </Button>
                        <Button onClick={() => setPage(5)} className="m-5 md:m-0">
                            Nahh, but I don't track my calorie intake
                        </Button>
                    </div>
                </div>
                <div className={page === 4 ? `block` : `none`}>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Input type="text" className="md:mr-5 w-72" placeholder="My calorie intake is..."/>
                        <Button onClick={() => setPage(page + 1)} className="m-5 md:m-0">
                            Next
                        </Button>
                    </div>
                </div>
                <div className={page === 5 ? `block` : `none`}>
                    <br/>
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Breakfast</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Brunch</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-three" id="option-three" />
                            <Label htmlFor="option-three">Lunch</Label>
                        </div>
                        <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value="option-four" id="option-four"/>
                            <Label htmlFor="option-four">Dinner</Label>
                        </div>
                    </RadioGroup>
                    <Button onClick={() => setPage(page + 1)} className="mt-5">
                       Next
                    </Button>
                </div>
                <div className={page === 6 ? `block` : `none`}>
                    <br/>
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                            {allergenItems.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="items"
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
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
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
                    <Button onClick={() => setPage(page + 1)} className="mt-5">
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
                        <Button variant="link" onClick={() => setPage(1)}>Update my preference</Button>
                        <Button variant="link">Save this meal</Button>
                    </div>
                </div>
                </Form>
                {(page > 1 && page < 7) ? <Button variant="ghost" onClick={() => setPage(page - 1)}>Back</Button> : ''}
            </div>
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update my preference</Button>
                <Button>Save this meal</Button>
            </div>
        </div>
    )
}
