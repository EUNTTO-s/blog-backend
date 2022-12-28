-- migrate:up
INSERT INTO
  companies(company_name)
VALUES
("순양 전자"),
("순양 자동차"),
("순양 생명"),
("삼송 전자"),
("애쁠"),
("러쉬"),
("현대 자동차"),
("네이버"),
("카카오"),
("라인"),
("쿠팡"),
("배달의 민족"),
("Abib"),
("스마일게이트"),
("뮤지컬 컴퍼니"),
("KOTRA"),
("해커스"),
("김앤장"),
("당근마켓"),
("토스"),
("야놀자"),
("여기어때"),
("신세계"),
("종근당"),
("현대해상"),
("삼성화재"),
("디자인 팍스"),
("디자인팩토리"),
("올포랜드"),
("한국전력"),
("로펌 한바다"),
("넷플릭스"),
("왓챠"),
("웨이브"),
("위드마케터스"),
("제일 기획"),
("대한항공"),
("SM 엔터테인먼트"),
("동아출판"),
("국민은행");

-- migrate:down
SET foreign_key_checks = 0;
TRUNCATE TABLE `companies`;
SET foreign_key_checks = 1;