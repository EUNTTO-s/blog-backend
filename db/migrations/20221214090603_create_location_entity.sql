-- migrate:up
INSERT INTO
    `level_1_categories` (img_url, category_name)
VALUES
    ('test.png', 'IT'), ('test.png', '광고·마케팅'), ('test.png', '콘텐츠'), ('test.png', '개발'), ('test.png', '디자인'), ('test.png', '기획·컨선팅'),
    ('test.png', '법률'), ('test.png', '세무·회계'), ('test.png', '교육'), ('test.png', '금융'), ('test.png', '그외1'), ('test.png', '그외2');

INSERT INTO
    `locations` (id, location_name)
VALUES
    (1, '강남'), (2, '광화문'), (3, '교대'), (4, '구로'), (5, '명동'), (6, '삼성'), (7, '서울숲'), (8, '서초'), (9, '선릉'), (10, '선정릉'), (11, '성수'),
    (12, '시청'), (13, '신논현'), (14, '신사'), (15, '여의도'), (16, '역삼'), (17, '영등포'), (18, '용산'), (19, '을지로'), (20, '합정'), (21, '홍대');

INSERT INTO
    `fastfive_branches` (locations_id, branch_name)
VALUES
    (1, '강남1호점'), (1, '강남2호점'), (1, '강남3호점'), (1, '강남4호점'), (1, '강남5호점'), (2, '광화문점'), (3, '교대점'), (4, '구로1호점'), (5, '명동1호점'), (6, '삼성1호점'),
    (6, '삼성2호점'), (6, '삼성3호점'), (6, '삼성4호점'), (7, '서울숲점'), (8, '서초점'), (9, '선릉1호점'), (9, '선릉2호점'), (10, '선정릉역'), (11, '성수점'), (12, '시청1호점'),
    (12, '시청2호점'), (13, '신논현1호점'), (14, '신사점'), (15, '여의도점'), (16, '역삼1호점'), (16, '역삼2호점'), (16, '역삼3호점'), (16, '역삼4호점'), (17, '영등포점'),
    (18, '용산1호점'), (19, '을지로점'), (20, '합정점'), (21, '홍대1호점'), (21, '홍대2호점');

INSERT INTO
    `level_2_categories` (id, level_1_categories_id, category_name)
VALUES
    (1, 10011, 'default2');

-- migrate:down
TRUNCATE TABLE `level_1_categories`;
TRUNCATE TABLE `locations`;
TRUNCATE TABLE `fastfive_branches`;
