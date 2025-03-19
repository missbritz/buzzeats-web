import { getUserMeals } from "@/actions/tables"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { SavedMealTypeDef } from "../types"
import { slugify } from "../../utils/utils"
import Link from "next/link"
import { createClient } from "../../utils/supabase/server";
import { redirect } from 'next/navigation';

const UserMeals = async () => {
    const supabase = createClient();

    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error) {
      return redirect("/login");
    }

    if (!user) {
      return redirect("/login");
    }

    const meals = await getUserMeals(user.id);

    return (
        <div className="self-center">
            <div className="w-full px-5">
                <h2 className="text-left mb-5 text-3xl text-stone-400"><strong>My Meals</strong></h2>
                {Array.isArray(meals) && meals.length ? (
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-left">Date</TableHead>
                                <TableHead className="w-[100px] text-left">Meal Type</TableHead>
                                <TableHead className="text-left">Meal Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {meals.map((meal:SavedMealTypeDef) => (
                                <TableRow key={meal.id}>
                                    <TableCell className="font-medium text-left">{new Date(meal.created_at).toISOString().split('T')[0]}</TableCell>
                                    <TableCell className="text-left capitalize">{meal.mealType}</TableCell>
                                    <TableCell className="text-left"><Link href={`/dashboard/meals/${slugify(meal.mealName)}`}>{meal.mealName}</Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>You have no saved meals yet.</p>
                )}
            </div>
        </div>
    )
}

export default UserMeals