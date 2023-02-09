-- migrate:up
INSERT INTO
  follow (users_id, target_users_id)
VALUES
  (1, 2), (1, 3), (1, 4),
  (2, 1), (2, 4),
  (3, 1), (3, 2), (3, 4),
  (6, 1), (6, 2), (6, 3), (6, 4), (6, 5)

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `follow`;
SET foreign_key_checks = 1;
