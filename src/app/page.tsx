import Image from "next/image";
import ScreenStepper from "@/components/Stepper";
import MealForm from "@/components/MealForm";
import { bangers } from "./layout";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-lime-500 items-center justify-between p-12 text-center">
        <h1 className={`text-white ${bangers.className}`}>buzz eats</h1>
      </div>
      <div className="items-center justify-between p-24 text-center">
        <MealForm></MealForm>
      </div>
    </main>
  );
}
