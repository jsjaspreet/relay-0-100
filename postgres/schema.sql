create table links (
  id serial primary key,
  link varchar(255) not null,
  link_title varchar(255) not null,
  created_at timestamp not null
);
