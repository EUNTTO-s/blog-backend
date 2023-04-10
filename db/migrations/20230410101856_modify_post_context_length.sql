-- migrate:up
ALTER TABLE posts MODIFY content varchar(6000);
-- migrate:down
ALTER TABLE posts MODIFY content varchar(1500);
