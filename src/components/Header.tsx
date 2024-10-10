import { Bangers } from 'next/font/google';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/server';
import { Button } from './ui/button';
import { AppNavigation } from './UserNavigation';

const bangers = Bangers({ weight: ['400'], subsets: ['latin'] });

export default async function Header () {

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const Intro = ({ user }:any) => {
        return user ? (
            <p className="text-white p-5">
            <strong>Ola {user.user_metadata.name}!</strong><br />Generate your meals <Link href="/"><strong>here</strong></Link>
        </p>
        ) : (
            <p className="text-white p-5">
                <strong>Ola!</strong> I'm an AI-Powered meal generator
                to help you create quick meals based on your preference
                such as allergens, diet restrictions, your calorie
                intake or even whatever is available in your kitchen.
            </p>
        )
    }

    return (
        <div className="bg-lime-500 p-12 flex flex-row justify-center">
            <div className="max-w-5xl w-full">
                <div className="flex justify-end">
                    <div>
                        <AppNavigation user={user}/>
                    </div>
                </div>
                <div className="items-center text-center mt-4">
                    <h1
                        className={`text-white text-5xl p-5 ${bangers.className}`}
                    >
                        buzz eats
                    </h1>
                    <Intro user={user} />
                </div>
            </div>
        </div>
    )
}