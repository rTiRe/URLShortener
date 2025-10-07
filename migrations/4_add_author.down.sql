drop index if exists idx_urls_user_id;
alter table "shortener"."urls" drop column user_id;