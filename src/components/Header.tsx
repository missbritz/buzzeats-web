import { Bangers } from 'next/font/google';

const bangers = Bangers({ weight: ['400'], subsets: ['latin'] });

const Header = () => {
    return (
        <div className="bg-lime-500 p-12 flex justify-center">
            <div className="max-w-5xl items-center text-center">
                <h1
                    className={`text-white text-5xl p-5 ${bangers.className}`}
                >
                    buzz eats
                </h1>
                <p className="text-white p-5">
                    <strong>Ola!</strong> I'm an AI-Powered meal generator
                    to help you create quick meals based on your preference
                    such as allergens, diet restrictions, your calorie
                    intake or even whatever is available in your kitchen.
                </p>
            </div>
        </div>
    )
}

export default Header