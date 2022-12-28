-- migrate:up
INSERT INTO
users (id, username, email, password)
VALUES
  (1, 'admin', 'admin@gmail.com', '$2a$10$pxMSg9pMZ8yQjY/o3hIFnuRCk5PDnWtVYVeXkqGbws6eXFuC9VxVK'),

  (2, 'test1-1', 'test1_1@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'), -- pwd: test123@
  (3, 'test1-2', 'test1_2@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (4, 'test1-3', 'test1_3@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),

  (5, 'test2-1', 'test2_1@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (6, 'test2-2', 'test2_2@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (7, 'test2-3', 'test2_3@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),

  (8, 'test3-1', 'test3_1@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (9, 'test3-2', 'test3_2@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (10, 'test3-3', 'test3_3@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),

  (11, 'test4', 'test4@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (12, 'test5', 'test5@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (13, 'test6', 'test6@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (14, 'test7', 'test7@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (15, 'test8', 'test8@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (16, 'test9', 'test9@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (17, 'test10', 'test10@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (18, 'test11', 'test11@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (19, 'test12', 'test12@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (20, 'test13', 'test13@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (21, 'test14', 'test14@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (22, 'test15', 'test15@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (23, 'test16', 'test16@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (24, 'test17', 'test17@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (25, 'test18', 'test18@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (26, 'test19', 'test19@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (27, 'test20', 'test20@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (28, 'test21', 'test21@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (29, 'test22', 'test22@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (30, 'test23', 'test23@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (31, 'test24', 'test24@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (32, 'test25', 'test25@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (33, 'test26', 'test26@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (34, 'test27', 'test27@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (35, 'test28', 'test28@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (36, 'test29', 'test29@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (37, 'test30', 'test30@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (38, 'test31', 'test31@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (39, 'test32', 'test32@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (40, 'test33', 'test33@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (41, 'test34', 'test34@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (42, 'test35', 'test35@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (43, 'test36', 'test36@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (44, 'test37', 'test37@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (45, 'test38', 'test38@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (46, 'test39', 'test39@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6'),
  (47, 'test40', 'test40@naver.com', '$2a$10$A38j9gaM4VALxKfMNVroRu.h1tvg8Yoi02oaHHA5WJNpvRLG3UqI6');

INSERT INTO
admins (users_id)
VALUES (1);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `admins`;
TRUNCATE TABLE `users`;
SET foreign_key_checks = 1;
