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
import { useState } from "react";

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })

export default function MealForm (){
    const [page, setPage] = useState(0)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          items: ["recents", "home"],
        },
      })


    const allergenItems = [
        {
            id: 'fish',
            label: 'Fish'
        },
        {
            id: 'pork',
            label: 'Pork'
        },
        {
            id: 'beef',
            label: 'Beef'
        },
        {
            id: 'shellfish',
            label: 'Shellfish / Crustaceans'
        },
        {
            id: 'molluscs',
            label: 'Molluscs'
        },
        {
            id: 'eggs',
            label: 'Eggs'
        },
        {
            id: 'gluten',
            label: 'Gluten'
        },
        {
            id: 'treenuts',
            label: 'Tree Nuts'
        },
    ]

    return (
        <div>
            <div>
                <Form {...form}>
                <div className={page === 0 ? `block` : `none`}>
                    <p className="text-stone-500">I need help with my meal and…</p>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPage(page + 1)} className="md:mr-5 p-10">
                            Yesss! I have some ingredients
                        </Button>
                        <Button onClick={() => setPage(2)} className="m-5 md:m-0 p-10">
                            No, but i’ll get them
                        </Button>
                    </div>
                </div>
                <div className={page === 1 ? `block` : `none`}>
                    <p className="text-stone-500">My kitchen has...</p>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Input type="text"></Input>
                        <Button onClick={() => setPage(page + 1)}>
                        Next
                        </Button>
                    </div>
                </div>
                <div className={page === 2 ? `block` : `none`}>
                    <p className="text-stone-500">I need a meal with estimated calorie of...</p>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Button onClick={() => setPage(page + 1)}>
                            Yesss, I do!
                        </Button>
                        <Button onClick={() => setPage(page + 4)}>
                            Nahh, but I don't track my calorie intake
                        </Button>
                    </div>
                </div>
                <div className={page === 3 ? `block` : `none`}>
                    <p className="text-stone-500">My daily calorie intake is...</p>
                    <div className="flex flex-col items-center justify-center md:flex-row p-5">
                        <Input type="text"></Input>
                        <Button onClick={() => setPage(page + 1)}>
                            Yesss, I do!
                        </Button>
                    </div>
                </div>
                <div className={page === 4 ? `block` : `none`}>
                    <p className="text-stone-500">I want to make meals for...</p>
                    <br/>
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Breakfast</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Brunch</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Lunch</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-three" id="option-two" />
                            <Label htmlFor="option-two">Dinner</Label>
                        </div>
                    </RadioGroup>
                    <Button onClick={() => setPage(page + 1)}>
                       Next
                    </Button>
                </div>
                <div className={page === 5 ? `block` : `none`}>
                    <p className="text-stone-500">I have diet restrictions or allergic to...</p>
                    <br/>
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Sidebar</FormLabel>
                                <FormDescription>
                                Select the items you want to display in the sidebar.
                                </FormDescription>
                            </div>
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
                                        <FormLabel className="font-normal">
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
                    <Button onClick={() => setPage(page + 1)}>
                        Next
                    </Button>
                </div>
                <div className={page === 6 ? `block` : `none`}>
                    <Button>Go</Button>
                    <Button variant="link">Please save my prefence!</Button>
                    <Button variant="destructive">Please save my prefence!</Button>
                    <Button variant="outline">Please save my prefence!</Button>
                    <Button variant="secondary">Please save my prefence!</Button>
                    <Button variant="ghost">Please save my prefence!</Button>
                </div>
                </Form>
            </div>
            <div className="none">
                <Button>I don't like this meal. Next please.</Button>
                <Button>Update</Button>
            </div>
        </div>
    )
}
