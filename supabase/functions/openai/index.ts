import 'https://deno.land/x/xhr@0.3.0/mod.ts'
import { OpenAI } from 'https://deno.land/x/openai@v4.24.0/mod.ts'

export const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('FE_DOMAIN'),
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {

  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const { ingredients, calories, allergen, ingredientsImg, mealType } = await req.json()
  console.log(req)
  let messages = []

  const message = `You are a highly skilled AI chef and nutritionist to generate a ${mealType} meal.  You will include the unit of measurement for each ingredients in a single string. ${ingredientsImg ? `You will include all the edible objects that you find in the image to generate a meal.` : ``} You will include edible ingredients ${ingredients.length ? ` such as ${ingredients.join(",")}.` : `.`}  ${calories ? `You will ensure that the estimated calories for the meal is ${calories}.` : ``}  ${allergen.length ? `Above all ingredients provided and to consider for this meal, allergens such as ${allergen.join(",")} will take precedence and should never be included in the meal.` : ``}  You will generate the resulting dish in a json format in a key value pair in camel case where the key names are "mealName" for the dish name, "ingredients", "instructions", "totalCalories", "nutritionFacts", "extras" for specific notes for the dish such that ingredients and instructions must be in array and nutritionFacts with key value pair.`

  messages = [{
    type: "text",
    text: message
  }]

  if (ingredientsImg !== '') {
    messages.push({
      type: "image_url",
      image_url: {
        url: ingredientsImg
      }
    })
  }

  const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: messages }],
    model: 'gpt-4o-mini',
    stream: false,
    response_format: {
      type: 'json_object',
    }
  })

  const reply = chatCompletion.choices[0].message.content

  return new Response(reply, {
    headers: { 
      ...corsHeaders,
      'Content-Type': 'application/json'
    },
  })
})