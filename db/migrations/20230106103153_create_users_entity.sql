-- migrate:up
INSERT INTO
  users (nickname, email, password)
VALUES
  (
    '테스터',
    'test1@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ), -- test123@
  (
    '짱구',
    'test2@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ), -- test123@
  (
    '액션가면',
    'test3@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ), -- test123@
  (
    '봉미선',
    'test4@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ), -- test123@
  (
    '철수',
    'test5@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ), -- test123@
  (
    '신짱아',
    'test6@gmail.com',
    '$2a$10$2zJdcIpvQ5FFX.SZQKQq9edBSYmrl8Gk/uAtNSEJeceHH0xXZIWHS'
  ) -- test123@

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `users`;
SET foreign_key_checks = 1;