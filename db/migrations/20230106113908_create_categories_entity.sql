-- migrate:up
INSERT INTO
  categories (users_id, category_name)
VALUES
  (1, "맛집 기록"), (1, '음악 리스트'), (1, '일기'), (1, '공부')

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `categories`;
SET foreign_key_checks = 1;
