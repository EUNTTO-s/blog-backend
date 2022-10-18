-- migrate:up
ALTER TABLE postings ADD `updated_at` datetime default now() ON UPDATE now();
ALTER TABLE comments ADD `updated_at` datetime default now() ON UPDATE now();
-- migrate:down
ALTER TABLE comments DROP COLUMN `updated_at`;
ALTER TABLE postings DROP COLUMN `updated_at`;