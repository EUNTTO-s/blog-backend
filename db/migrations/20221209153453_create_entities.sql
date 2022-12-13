-- migrate:up
INSERT INTO
  companies(id, company_name)
VALUES
(10000, "밀리는서재"),
(10001, "JSOP");

INSERT INTO
  level_1_categories(
    category_name,
    description,
    img_url,
    id
  )
VALUES
(
    "마케팅",
    "마케팅은 마케팅을 하는 것이다.",
    '이미지 경로',
    10000
);

INSERT INTO
  level_2_categories(
    level_1_categories_id,
    category_name,
    description,
    id
  )
VALUES
  (
    10000,
    'default',
    'default description',
    10000
  );

INSERT INTO
  users(`password`, email, id, username)
VALUES
  ('d', 'sororiri@gmail.com', 10000, '이상윤');

INSERT INTO
  locations(id, location_name)
VALUES
  (10000, '강남, 논현');

INSERT INTO
  fastfive_branches(id, branch_name, locations_id)
VALUES
  (10000, '강남 1호점', 10000);


INSERT INTO
  company_post_forms(
    companies_id,
    company_name,
    company_contact_address,
    company_img_url,
    company_info_url,
    company_long_desc,
    company_short_desc,
    fastfive_benefit_desc,
    fastfive_branches_id,
    homepage_url,
    level_2_categories_id,
    main_bussiness_tags,
    users_id
  )
VALUES
(
    10000,
    "new 밀리는서재",
    'sororiri@gmail.com, 010-1111-1111',
    '밀리는서재.png',
    '밀리는서재소개.pdf',
    '아주 긴 설명이야',
    '나름 짧은 설명이야',
    '혜택은 급여야~',
    10000,
    'www.milly.com',
    10000,
    '서적, 공부, 아몰라',
    10000
  );


-- migrate:down

SET foreign_key_checks = 0;
TRUNCATE TABLE `companies`;
TRUNCATE TABLE `level_1_categories`;
TRUNCATE TABLE `level_2_categories`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `locations`;
TRUNCATE TABLE `fastfive_branches`;
TRUNCATE TABLE `company_post_forms`;
SET foreign_key_checks = 1;