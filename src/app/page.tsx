import MealForm from "@/components/MealForm"
import { createClient } from '../../utils/supabase/server';


const Home = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (
        <MealForm user={user}/>
    )
}

export default Home