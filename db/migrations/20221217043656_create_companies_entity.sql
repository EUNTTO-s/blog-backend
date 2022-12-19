-- migrate:up
INSERT INTO
  companies(company_name)
VALUES
("밀리는서재"),
("JSOP");

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `companies`;
SET foreign_key_checks = 1;
