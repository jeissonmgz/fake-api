export const prerender = false

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const user = await supabase.auth.getUser()
  const formData = await request.formData();
  const path = formData.get("path")?.toString();
  const method = formData.get("method")?.toString();
  const id = formData.get("id")?.toString();
  const user_id = user.data.user.id;

  if (!path || !method || !id) {
    return new Response("Method and path is required", { status: 400 });
  }

  const { error } = await supabase
  .from('endpoints')
  .update([
    { path, method, user_id },
  ])
  .eq('id', id)
  .select()

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  
  return redirect(`/responses/${id}`);
};