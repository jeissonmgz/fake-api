export const prerender = false

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const user = await supabase.auth.getUser()
  const formData = await request.formData();
  const path = formData.get("path")?.toString();
  const method = formData.get("method")?.toString();
  const project = formData.get("project")?.toString();
  const user_id = user.data.user.id;

  if (!path || !method) {
    return new Response("Path and method is required", { status: 400 });
  }

  const { data, error } = await supabase
  .from('endpoints')
  .insert([
    { path, method, user_id, project },
  ])
  .select()

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  
  return redirect(`/endpoints/${project}`);
};