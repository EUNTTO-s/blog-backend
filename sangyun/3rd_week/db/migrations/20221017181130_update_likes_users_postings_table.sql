-- migrate:up
ALTER TABLE likes_postings_users ADD likes boolean NOT NULL;

-- migrate:down
ALTER TABLE likes_postings_users DROP COLUMN likes;