alter table "public"."endpoints" drop constraint "public_endpoints_id_fkey";

alter table "public"."endpoints" add constraint "public_endpoints_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."endpoints" validate constraint "public_endpoints_project_fkey";


