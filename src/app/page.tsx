"use client"

import MealForm from "@/components/MealForm";
import { bangers } from "./layout";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [sectionTitle, setSectionTitle] = useState('');
  return (
    <main className="min-h-screen items-center flex-col justify-center">
      <div className="bg-lime-500 p-12 flex justify-center">
        <div className="max-w-5xl items-center text-center">
          <h1 className={`text-white text-5xl p-5 ${bangers.className}`}>buzz eats</h1>
          {sectionTitle === '' && (<p className="text-white p-5"><strong>Ola!</strong>  I'm an AI-Powered meal generator to help you create quick meals based on your preference such as allergens, diet restrictions, your calorie intake or even whatever is available in your kitchen. Click below to <strong>start.</strong></p>)}
          <h3 className="text-white p-5 font-bold">{sectionTitle}</h3>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-5xl flex items-center text-center min-h-80 py-24">
          <div className="w-full px-5">
            <MealForm activeTitle={setSectionTitle}></MealForm>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full items-center flex justify-center border-solid border-t border-stone-200 mx-12 p-4">
          <p className="text-xs text-stone-400 text-center">Created by <Link href="https://britzoblan.com">Britta Oblan</Link></p>
        </div>
      </div>
    </main>
  );
}
