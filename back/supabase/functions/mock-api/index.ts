import { Hono } from 'https://deno.land/x/hono/mod.ts'
import type { Context } from 'https://deno.land/x/hono/mod.ts'
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabaseUrl = Deno.env.get('_SUPABASE_URL')
const supabaseKey = Deno.env.get('_SUPABASE_ANON_KEY')

const supabase = createClient(supabaseUrl, supabaseKey)

const functionName = 'mock-api'
const app = new Hono().basePath(`/${functionName}`)


function pauseExecution(timeInMs: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeInMs);
  });
}

const getResponse = async (c: Context, method: string) => {
  const project = c.req.param('project') as string
  const endpoint = c.req.param('endpoint') as string
  
  let { data, error } = await supabase
  .rpc('get_endpoint', {
    endpoint_path: endpoint, 
    method_path: method, 
    project_path: project
  })
if (error) console.error(error)
else console.log(data)

    const headers = Object.keys(data.head).map(key => ({ key: key, value: data.head[key] }));
    headers.forEach(item=> {
      c.header(item.key, item.value)
    })
    c.status(data.code)
    await pauseExecution(data.duration)
    return c.json(data.body)
}


app.get('/:project/:endpoint', async (c: Context) => {
  return getResponse(c,  'get')
})
app.post('/:project/:endpoint', async (c: Context) => {
  return getResponse(c,  'post')
})
app.delete('/:project/:endpoint', async (c: Context) => {
  return getResponse(c,  'delete')
})
app.put('/:project/:endpoint', async (c: Context) => {
  return getResponse(c,  'put')
})
app.patch('/:project/:endpoint', async (c: Context) => {
  return getResponse(c,  'patch')
})

Deno.serve(app.fetch)



//Database
//supabase db diff --use-migra -f initial_schema