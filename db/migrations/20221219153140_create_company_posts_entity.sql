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
  1,  -- companyId
  "순양 전자",
  "soonyang@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  1, -- branch Id
  "www.naver.com",
  1, -- level_2_categories_id
  "순양, 파워, 대박",
  2  -- usersId
),
(
  2,  -- companyId
  "순양 자동차",
  "soonyang-car@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  2, -- branch Id
  "www.naver.com",
  2, -- level_2_categories_id
  "순양, 파워, 대박",
  5  -- usersId
),
(
  3,  -- companyId
  "순양 생명",
  "soonyang-car@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  3, -- branch Id
  "www.naver.com",
  3, -- level_2_categories_id
  "순양자동차, 순양맨, 순양멤버쉽",
  8  -- usersId
),
(
  6,  -- companyId
  "러쉬",
  "samsong@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  4, -- branch Id
  "www.naver.com",
  4, -- level_2_categories_id
  "러쉬, 앤, 캐쉬",
  12  -- usersId
),
(
  7,  -- companyId
  "현대 자동차",
  "hyundai@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  5, -- branch Id
  "www.hyundai.com",
  5, -- level_2_categories_id
  "우령아, 자동차, 선물이야",
  13  -- usersId
),
(
  8,  -- companyId
  "네이버",
  "naver@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  6, -- branch Id
  "www.naver.com",
  6, -- level_2_categories_id
  "라인, 빠른, 모두",
  14  -- usersId
),
(
  9,  -- companyId
  "카카오",
  "kakao@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  7, -- branch Id
  "www.kakao.com",
  7, -- level_2_categories_id
  "카카오, 맛있어, 달아",
  15  -- usersId
),
(
  10,  -- companyId
  "라인",
  "line@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  8, -- branch Id
  "www.line.com",
  8, -- level_2_categories_id
  "라인, 웹툰, 재밌어",
  16  -- usersId
),
(
  11,  -- companyId
  "쿠팡",
  "coopang@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  9, -- branch Id
  "www.coopang.com",
  9, -- level_2_categories_id
  "쿠팡, 아주, 빠른 배송",
  17  -- usersId
),
(
  12,  -- companyId
  "배달의 민족",
  "beamin@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  10, -- branch Id
  "www.beamin.com",
  10, -- level_2_categories_id
  "빠른, 배달, 민족",
  18  -- usersId
),
(
  13,  -- companyId
  "Abib",
  "Abib@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  11, -- branch Id
  "www.Abib.com",
  11, -- level_2_categories_id
  "영어, 어려워요, 정말루",
  19  -- usersId
),
(
  14,  -- companyId
  "스마일 게이뚜",
  "sg@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  12, -- branch Id
  "www.sg.com",
  12, -- level_2_categories_id
  "웃어요, 문을, 열고",
  20  -- usersId
),
(
  15,  -- companyId
  "뮤지컬 컴퍼니",
  "music@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  13, -- branch Id
  "www.music.com",
  13, -- level_2_categories_id
  "음악쓰",
  21  -- usersId
),
(
  16,  -- companyId
  "KOTRA",
  "kotra@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  14, -- branch Id
  "www.kotra.com",
  14, -- level_2_categories_id
  "코트라, 비싼, 녀석",
  22  -- usersId
),
(
  17,  -- companyId
  "해커스",
  "hackers@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  15, -- branch Id
  "www.hackers.com",
  15, -- level_2_categories_id
  "해커스, 돈, 겁나 많이 범",
  13  -- usersId
),
(
  18,  -- companyId
  "김앤장",
  "kimandjang@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  16, -- branch Id
  "www.kimandjang.com",
  16, -- level_2_categories_id
  "변호사, 역시, 여기지",
  24  -- usersId
),
(
  19,  -- companyId
  "당근 마켓",
  "carrot-market@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  1, -- branch Id
  "www.carrot-market.com",
  17, -- level_2_categories_id
  "내 집앞, 거래하자",
  25  -- usersId
),
(
  20,  -- companyId
  "토스",
  "toss@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  2, -- branch Id
  "www.toss.com",
  18, -- level_2_categories_id
  "돈을, 보내, 보자",
  26  -- usersId
),
(
  21,  -- companyId
  "야놀자",
  "yanolja@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  3, -- branch Id
  "www.yanolja.com",
  19, -- level_2_categories_id
  "놀자, 여기서",
  27  -- usersId
),
(
  22,  -- companyId
  "여기 어때",
  "herewhat@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  4, -- branch Id
  "www.herewhat.com",
  3, -- level_2_categories_id
  "코코, 도꼬",
  28  -- usersId
),
(
  23,  -- companyId
  "신세계",
  "new-world@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  5, -- branch Id
  "www.new-world.com",
  4, -- level_2_categories_id
  "새로운, 세상, 이것저것 팜",
  29  -- usersId
),
(
  24,  -- companyId
  "종근당",
  "ckd@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  6, -- branch Id
  "www.ckd.com",
  2, -- level_2_categories_id
  "의약, 건강, 연구",
  30  -- usersId
),
(
  25,  -- companyId
  "현대해상",
  "hdai@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  13, -- branch Id
  "www.hdai.com",
  6, -- level_2_categories_id
  "보험, 계약, 관리",
  31  -- usersId
),
(
  26,  -- companyId
  "삼성화재",
  "samsungh@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  6, -- branch Id
  "www.samsungh.com",
  12, -- level_2_categories_id
  "보험, 납입, 청구",
  32  -- usersId
),
(
  27,  -- companyId
  "디자인 팍스",
  "designfax@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  7, -- branch Id
  "www.designfax.com",
  6, -- level_2_categories_id
  "건축, 디자인, 설계",
  33  -- usersId
),
(
  28,  -- companyId
  "디자인팩토리",
  "designfact@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  8, -- branch Id
  "www.designfact.com",
  6, -- level_2_categories_id
  "디자인, 공공기관, 외주",
  34  -- usersId
),
(
  29,  -- companyId
  "올포랜드",
  "all4@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  20, -- branch Id
  "www.all4.com",
  4, -- level_2_categories_id
  "개발, 서버, 기현",
  35  -- usersId
),
(
  30,  -- companyId
  "한국전력",
  "koreaelec@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  18, -- branch Id
  "www.koreaelec.com",
  4, -- level_2_categories_id
  "한국, 전력, 전기",
  36  -- usersId
),
(
  31,  -- companyId
  "로펌 한바다",
  "onebada@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  12, -- branch Id
  "www.onebada.com",
  7, -- level_2_categories_id
  "보험, 계약, 관리",
  37  -- usersId
),
(
  32,  -- companyId
  "넷플릭스",
  "netflix@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  21, -- branch Id
  "www.netflix.com",
  5, -- level_2_categories_id
  "영화, 드라마, 예능",
  38  -- usersId
),
(
  33,  -- companyId
  "왓챠",
  "watcha@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  14, -- branch Id
  "www.watcha.com",
  5, -- level_2_categories_id
  "드라마, 영화, 구독",
  39  -- usersId
),
(
  34,  -- companyId
  "웨이브",
  "wavve@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  13, -- branch Id
  "www.wavve.com",
  5, -- level_2_categories_id
  "드라마, 보러, 오세요",
  40  -- usersId
),
(
  35,  -- companyId
  "위드마케터스",
  "withmark@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  4, -- branch Id
  "www.withmark.com",
  2, -- level_2_categories_id
  "마케팅, 홍보, 광고",
  41  -- usersId
),
(
  36,  -- companyId
  "제일 기획",
  "number1@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  10, -- branch Id
  "www.number1.com",
  2, -- level_2_categories_id
  "광고, 제일은, 여기로",
  42  -- usersId
),
(
  37,  -- companyId
  "대한항공",
  "koreaair@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  3, -- branch Id
  "www.koreaair.com",
  12, -- level_2_categories_id
  "항공, 여행, 비즈니스",
  43  -- usersId
),
(
  38,  -- companyId
  "SM 엔터테인먼트",
  "sment@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  16, -- branch Id
  "www.sment.com",
  11, -- level_2_categories_id
  "공연, 기획, 연예",
  44  -- usersId
),
(
  39,  -- companyId
  "동아출판",
  "donga@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  17, -- branch Id
  "www.donga.com",
  11, -- level_2_categories_id
  "출판, 서적, 동아",
  45  -- usersId
),
(
  40,  -- companyId
  "국민은행",
  "kbank@gmail.com",
  "/default-img.png",
  "/fastival.sql",
  "긴 글 소개에요",
  "짧은 글 소개에요",
  "페스티벌하면 이런 이런게 좋아요",
  21, -- branch Id
  "www.kbank.com",
  10, -- level_2_categories_id
  "적금, 예금, 금리",
  46  -- usersId
);

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `company_posts`;
SET foreign_key_checks = 1;