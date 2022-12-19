-- migrate:up
INSERT INTO
users (id, username, email, password)
VALUES
  (1, 'admin', 'admin@gmail.com', '$2a$10$pxMSg9pMZ8yQjY/o3hIFnuRCk5PDnWtVYVeXkqGbws6eXFuC9VxVK'),
  (2, 'test1', 'test1@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'), -- pwd: test123@
  (3, 'test2', 'test2@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (4, 'test3', 'test3@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (5, 'test4', 'test4@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6');


INSERT INTO
admins (users_id)
VALUES (1);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `admins`;
TRUNCATE TABLE `users`;
SET foreign_key_checks = 1;
