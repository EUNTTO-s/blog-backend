-- migrate:up
INSERT INTO
  topics (topic_name)
VALUES
  ('일상'), ('음식'), ('여행'), ('예술'), ('쇼핑'), ('운동'), ('IT')

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `topics`;
SET foreign_key_checks = 1;
