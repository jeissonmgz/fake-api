export const prerender = false

import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const GET: APIRoute = async ({ request, redirect }) => {
  const id = new URL(request.url).searchParams.get("id");
  const response = new URL(request.url).searchParams.get("response");
  const responseService = await supabase
  .from('endpoints')
  .update({ default_response: response })
  .eq('id', id)
  .select();

  console.log("responseService", responseService, response)
  
  return redirect(`/responses/${id}`);
};