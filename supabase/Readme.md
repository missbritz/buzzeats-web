# buzzeats-web
---
This is buzzeats-web's core API built with Supabase Edge Function where OpenAI is integrated.

### Prerequisites
---
- Docker
- Supabase CLI

## Getting Started
---
1. Create your Supabase Edge Function.  It will start a step by step setup for your Edge function.  The code below will create a supabase directory of your project with the function name.  The function name becomes the folder name of your function.

    ```bash
        supabase functions new <function name e.g. openai>
    ```

2. Update the environment variables in **.env.example**.  Run the code below to set your environment variables to the Edge Function's secrets.

    ```bash
        supabase secrets set --env-file ./supabase/functions/openai/.env
    ```

    More details on Managing Secrets and Environment Variables [here](https://supabase.com/docs/guides/functions/secrets).
3.  When you are ready to deploy, run the command below.  Project reference is also the subdomain of the edge function e.g. `https://project-reference.supabase.co/functions/v1/function-name`.

    ```bash
        supabase functions deploy openai --project-ref <Project reference>
    ```

### Running Edge Function Locally
1. Start Supabase container

    ```bash
        supabase start
    ```

2. Start Supabase Function.  This will give you the endpoint for your local edge function e.g. http://127.0.0.1:54321/functions/v1/openai

    ```bash
        supabase functions serve
    ```

3. You can do a curl/postman request with the endpoint.

```bash
    curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/openai' --header 'Authorization: Bearer ' --header 'Content-Type: application/json'--data '{}'
```