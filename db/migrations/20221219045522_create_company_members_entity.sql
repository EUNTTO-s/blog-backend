-- migrate:up
INSERT INTO
  company_members(
    companies_id,
    is_main_member,
    users_id
  )
VALUES
(1, 1, 1),
(2, 1, 2),
(2, 0, 3),
(1, 0, 4);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `company_members`;
SET foreign_key_checks = 1;
