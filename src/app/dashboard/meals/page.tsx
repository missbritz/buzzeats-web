import { createClient } from "../../../../utils/supabase/server";
import { redirect } from 'next/navigation';

export default async function Meals() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  } else {
    return redirect("/dashboard");
  }

}
