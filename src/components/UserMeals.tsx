import { getUserMeals } from "@/actions/tables"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"


const UserMeals = async ({ user }: any) => {
    const meals = await getUserMeals(user.user_metadata.sub)

    return (
        <div className="self-center py-12">
            <div className="w-full px-5">
                <h2 className="text-left"><strong>Ola!  Welcome back!</strong></h2>
                {meals.length ? (
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] text-left">Date</TableHead>
                        <TableHead className="w-[100px] text-left">Meal Type</TableHead>
                        <TableHead className="text-left">Meal Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meals.map((meal:any) => (
                        <TableRow key={meal.mealId}>
                            <TableCell className="font-medium text-left">{new Date(meal.created_at).toISOString().split('T')[0]}</TableCell>
                            <TableCell className="text-left capitalize">{meal.mealType}</TableCell>
                            <TableCell className="text-left">{meal.mealName}</TableCell>
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