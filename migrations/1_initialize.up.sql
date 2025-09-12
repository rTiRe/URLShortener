create schema if not exists "shortener";

create table if not exists "shortener"."urls" (
    id timestamp default current_timestamp,
    node smallint not null,
    short_code varchar(32) not null unique,
    original_url text not null
);