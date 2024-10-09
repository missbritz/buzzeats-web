import UserMeals from '@/components/UserMeals';
import { createClient } from "../../../utils/supabase/server";

export default async function UserMeal() {

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/login");
    }

    return (
        <UserMeals user={user}/>
    );
}
