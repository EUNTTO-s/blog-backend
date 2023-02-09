-- migrate:up
INSERT INTO
  categories (users_id, category_name)
VALUES
  (1, "맛집 기록"), (1, '음악 리스트'), (1, '일기'), (1, '공부'),
  (2, "수학"), (2, '영어'), (2, '일기'), (2, '주식'), -- 5 ~ 8
  (3, "SQL"), (3, 'C++'), (3, 'JAVA'), (3, 'ORACLE'), -- 9 ~ 13
  (4, "애니"), (4, '드라마'), (4, '영화'), -- 14 ~ 17
  (5, "영화"), (5, '애니'), (5, '드라마'), -- 18 ~ 21
  (6, "영어"), (6, '인생'), (6, '문화') -- 22 ~ 25

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `categories`;
SET foreign_key_checks = 1;
