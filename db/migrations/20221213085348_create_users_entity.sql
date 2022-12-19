-- migrate:up
INSERT INTO
users (id, username, email, password)
VALUES (1, 'admin', 'admin@gmail.com', '$2a$10$pxMSg9pMZ8yQjY/o3hIFnuRCk5PDnWtVYVeXkqGbws6eXFuC9VxVK');

INSERT INTO
admins (users_id)
VALUES (1);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `admins`;
TRUNCATE TABLE `users`;
SET foreign_key_checks = 1;
