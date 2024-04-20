drop function if exists "public"."get_response"(project character varying, endpoint character varying, method character varying);

alter table "public"."endpoints" add column "user_id" uuid;

alter table "public"."projects" add column "user_id" uuid;

alter table "public"."responses" add column "user_id" uuid;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_endpoint(project_path character varying, endpoint_path character varying, method_path character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$declare
   response json;
begin
   select json_build_object('body', responses.body, 'head', responses.head, 'code', responses.code, 'duration', endpoints.duration)
   into response
   from projects 
   inner join endpoints on projects.id = endpoints.project
   inner join responses on endpoints.default_response = responses.id
   where projects.base_url=project_path 
   and endpoints.path=endpoint_path
   and endpoints.method=method_path;
   
   return response;
end;$function$
;

create policy "allow-crud-projects"
on "public"."endpoints"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "allow-crud-projects"
on "public"."projects"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "allow-crud-responses"
on "public"."responses"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



