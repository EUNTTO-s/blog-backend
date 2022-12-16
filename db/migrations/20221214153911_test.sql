-- migrate:up
INSERT INTO
  company_posts(
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
    1
  );

-- migrate:down

