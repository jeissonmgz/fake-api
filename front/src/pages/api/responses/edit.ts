export const prerender = false

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const user = await supabase.auth.getUser()
  const formData = await request.formData();
  const body = JSON.parse(formData.get("body")?.toString());
  const head = JSON.parse(formData.get("head")?.toString());
  const code = formData.get("code")?.toString();
  
  const id = formData.get("id")?.toString();
  const user_id = user.data.user.id;

  if (!body || !head || !code) {
    return new Response("Body, head and code is required", { status: 400 });
  }

  const { data: [response], error } = await supabase
  .from('responses')
  .update([
    { body, head, code, user_id },
  ])
  .eq('id', id)
  .select()

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  
  return redirect(`/responses/${response.endpoint}`);
};