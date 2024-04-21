export const prerender = false

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const user = await supabase.auth.getUser()
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const base_url = formData.get("base_url")?.toString();
  const user_id = user.data.user.id;

  if (!name || !base_url) {
    return new Response("Name and path is required", { status: 400 });
  }

  const { data, error } = await supabase
  .from('projects')
  .insert([
    { name, base_url, user_id },
  ])
  .select()

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  
  return redirect("/projects");
};