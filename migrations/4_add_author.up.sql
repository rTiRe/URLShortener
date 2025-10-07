drop index if exists idx_urls_user_id;
alter table "shortener"."urls" add column user_id bytea not null;
create index idx_urls_user_id on "shortener"."urls" using btree (user_id);