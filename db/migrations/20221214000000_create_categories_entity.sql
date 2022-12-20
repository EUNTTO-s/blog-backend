-- migrate:up
INSERT INTO
    `level_1_categories` (img_url, category_name)
VALUES
    ('http://cdn.edujin.co.kr/news/photo/202207/39262_79422_811.jpg', 'IT'),
    ('https://images.unsplash.com/photo-1616418625298-baef98bc34f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80', '광고·마케팅'),
    ('https://i0.wp.com/cmosshoptalk.com/wp-content/uploads/2022/01/Contents-page00.png?fit=1000%2C720&ssl=1', '콘텐츠'),
    ('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', '개발'),
    ('https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', '디자인'),
    ('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', '기획·컨설팅'),
    ('https://plus.unsplash.com/premium_photo-1661769577787-9811af17f98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1953&q=80', '법률'),
    ('https://www.gagamtax.co.kr/layout/user_d_tax06_ko/static/images/semu/semu01_thum01.png', '세무·회계'),
    ('https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1232&q=80', '교육'),
    ('https://images.unsplash.com/photo-1593672715438-d88a70629abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', '금융'),
    ('https://images.velog.io/images/dev_shu/post/d695eb16-9f9e-44e4-9338-dc3b30c34d0d/etc.jpeg', '그외1'),
    ('https://images.velog.io/images/dev_shu/post/d695eb16-9f9e-44e4-9338-dc3b30c34d0d/etc.jpeg', '그외2');

INSERT INTO
    `level_2_categories` (level_1_categories_id, category_name)
VALUES
    (1, '일반'),
    (2, '광고'),
    (2, '마케팅'),
    (2, '홍보'),
    (3, '일반'),
    (4, '서버'),
    (4, '백엔드'),
    (4, '프론트엔드'),
    (4, '안드로이드'),
    (5, '그래픽'),
    (5, '서예'),
    (6, '일반'),
    (7, '변호사'),
    (7, '변리사'),
    (8, '세무'),
    (8, '회계'),
    (9, '유치원'),
    (9, '초중고'),
    (10, '금융영업'),
    (10, '금융컨설팅'),
    (11, '작가·시나리오'),
    (11, '감독·연출·PD'),
    (11, '공연·전시·무대·스탭'),
    (12, '무역·유통'),
    (12, '리서치·통계·설문'),
    (12, '외국어·번역·통역');


-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `level_2_categories`;
TRUNCATE TABLE `level_1_categories`;
SET foreign_key_checks = 1;
