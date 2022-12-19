-- migrate:up
INSERT INTO
    `level_1_categories` (img_url, category_name)
VALUES
    ('test.png', 'IT'), ('test.png', '광고·마케팅'), ('test.png', '콘텐츠'), ('test.png', '개발'), ('test.png', '디자인'), ('test.png', '기획·컨선팅'),
    ('test.png', '법률'), ('test.png', '세무·회계'), ('test.png', '교육'), ('test.png', '금융'), ('test.png', '그외1'), ('test.png', '그외2');

INSERT INTO
    `level_2_categories` (id, level_1_categories_id, category_name)
VALUES
    (1, 1, 'default');

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `level_2_categories`;
TRUNCATE TABLE `level_1_categories`;
SET foreign_key_checks = 1;
