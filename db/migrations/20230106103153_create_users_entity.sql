-- migrate:up
INSERT INTO
  users (nickname, email, password)
VALUES
  (
    '테스트1',
    'test1@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ) -- test123@

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `users`;
SET foreign_key_checks = 1;