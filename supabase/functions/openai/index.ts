// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { OpenAI } from 'https://deno.land/x/openai@v4.24.0/mod.ts'
import { OpenAIStream, StreamingTextResponse } from 'ai'


Deno.serve(async (req) => {
  const { query } = await req.json()
  const apiKey = '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'
  const openai = new OpenAI({
    apiKey: apiKey,
  })

  console.log(query)

  const ingredients = ["banana", "apple", "strawberry"]
  const calories = 350
  const image = null
  const allergens = ["apple"]

  let promptText = '';

  promptText = `You are a highly skilled AI chef and nutritionist. ${image ? `You will include all the edible objects that you find in the image to generate a meal.` : ``} You will include ingredients only${ingredients.length ? ` such as ${ingredients.join(",")}.` : `.`}  ${calories ? `You will ensure that the estimated calories for the meal is ${calories}.` : ``}  ${allergens.length ? `Above all ingredients provided and to consider for this meal, allergens such as ${allergens.join(",")} will take precedence and should never be included in the meal.` : ``}  You will generate the resulting dish in a json format in a key value pair in camel case where the key names are "mealName" for the dish name, "ingredients", "instructions", "totalCalories", "nutritionFacts", "extras" for specific notes for the dish such that ingredients, instructions must be in array and nutritionFacts with key value pair.`
  console.log(promptText)

  // Documentation here: https://github.com/openai/openai-node
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: promptText }],
    model: 'gpt-4o-mini',
    stream: false,
  })

  //const reply = chatCompletion.choices[0].message.content

  // return new Response(reply, {
  //   headers: { 'Content-Type': 'text/plain' },
  // })

  const stream = OpenAIStream(chatCompletion);
  return new StreamingTextResponse(stream, { 'Content-Type': 'text/plain' });
})


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/openai' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
