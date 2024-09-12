import 'https://deno.land/x/xhr@0.3.0/mod.ts'
import { OpenAI } from 'https://deno.land/x/openai@v4.24.0/mod.ts'

Deno.serve(async (req) => {
  const { ingredients, calories, allergens, ingredientsImg, mealType } = await req.json()
  console.log(req)
  // const ingredients = ["banana", "apple", "strawberry"]
  // const calories = 350
  //const image = null
  // const allergens = ["apple"]

  const message = `You are a highly skilled AI chef and nutritionist. ${ingredientsImg ? `You will include all the edible objects that you find in the image to generate a meal.` : ``} You will include ingredients only${ingredients.length ? ` such as ${ingredients.join(",")}.` : `.`}  ${calories ? `You will ensure that the estimated calories for the meal is ${calories}.` : ``}  ${allergens.length ? `Above all ingredients provided and to consider for this meal, allergens such as ${allergens.join(",")} will take precedence and should never be included in the meal.` : ``}  You will generate the resulting dish in a json format in a key value pair in camel case where the key names are "mealName" for the dish name, "ingredients", "instructions", "totalCalories", "nutritionFacts", "extras" for specific notes for the dish such that ingredients, instructions must be in array and nutritionFacts with key value pair.`

  const messages = [{
    
  }]

  const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: message }],
    model: 'gpt-4o-mini',
    stream: false,
    response_format: {
      type: 'json_object',
    }
  })

  const reply = chatCompletion.choices[0].message.content

  // const data = {
  //   ingredients,
  //   calories,
  //   allergens,
  //   image
  // }

  // const reply = JSON.stringify(data)

  return new Response(reply, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  })
})