-- extension for uui:s
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--create table
create table todos
(
    id         uuid DEFAULT uuid_generate_v4() primary key,
    title      varchar not null,
    text       varchar not null,
    todoOrder  SERIAL,
    isComplete boolean not null default false
);

--seed table
insert into todos (title,text) values
('lunch', 'ägg'),
('middag', 'korv');

--reorder trigger-function
CREATE FUNCTION trg_reorder() RETURNS trigger AS
$trg_reorder$
DECLARE
    t_row todos%rowtype;
BEGIN
    IF NEW.todoorder != OLD.todoorder THEN
        FOR t_row in SELECT * FROM todos
            LOOP
                IF t_row.todoorder >= NEW.todoorder AND t_row.id != NEW.id THEN
                    update todos
                    -- BUG this seems to be doubling rather than incrementing the value (1 -> 2, 2 -> 4, 4 -> 8)
                    -- Doesnt really matter... :|
                    set todoorder = todoorder + 1
                    where id = t_row.id;
                end if;
            END LOOP;
    END IF;
    RETURN NULL;
END;
$trg_reorder$ LANGUAGE plpgsql;

--reorder trigger
CREATE TRIGGER trg_reorder
    AFTER UPDATE
        OF todoorder
    ON todos
    FOR EACH ROW
EXECUTE FUNCTION trg_reorder();