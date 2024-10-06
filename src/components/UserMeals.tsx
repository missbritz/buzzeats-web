import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"


const UserMeals = ({ savedMeals }: any) => {
    console.log(savedMeals)
    return (
        <div className="flex justify-center">
            <div className="max-w-5xl w-full self-center py-12">
                <div className="w-full px-5">
                    <h2>Hi <strong>User</strong></h2>
                    {savedMeals.length ? (
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px] text-left">Date</TableHead>
                            <TableHead className="text-left">Meal Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {savedMeals.map((meal:any) => (
                            <TableRow key={meal.mealId}>
                                <TableCell className="font-medium text-left">{meal.mealDate}</TableCell>
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
        </div>
    )
}

export default UserMeals