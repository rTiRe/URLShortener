alter table "shortener"."urls" drop constraint if exists urls_pkey;
alter table "shortener"."urls" add constraint urls_pkey primary key (id, node);
