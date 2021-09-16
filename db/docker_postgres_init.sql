CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table todos
(
    id         uuid DEFAULT uuid_generate_v4() primary key,
    title      varchar not null,
    text       varchar not null,
    todoOrder  SERIAL,
    isComplete boolean not null default false
);

insert into todos (title,text) values
('korv', 'laga korv');