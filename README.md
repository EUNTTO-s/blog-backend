# 또-로그
- 자유롭게 글을 작성하고 사람들과 소통할 수 있다.

## 배포 사이트
https://ttolog.netlify.app/

## 주요 기능 요구사항:
- 유저 간 팔로우 기능
- 자신의 개인 정보 변경 기능 (내 블로그 이름, 소개글)
- 게시글 공개 여부 설정 (모두 공개, 맞팔 공개, 비공개)
- 게시글 검색 기능 (태그, 글 검색)
- 게시글 댓글, 썸네일, 태그 추가
- 자신의 잔디(깃헙 잔디) 확인 기능


## API Endpoints

| NAME        | CRUD   | ENDPOINT               |
|-------------|--------|------------------------|
| 게시글      | POST   | /posts                 |
|             | GET    | /posts/{id}            |
|             | GET    | /posts                 |
|             | DELETE | /posts/{id}            |
|             | PATCH  | /posts/{id}            |
| 댓글        | POST   | /comments              |
|             | GET    | /comments/{id}         |
|             | PUT    | /comments/{id}         |
|             | DELETE | /comments/{id}         |
| 유저        | POST   | /signup                |
|             | POST   | /login                 |
|             | POST   | /nickname/check        |
|             | POST   | /email/check           |
|             | GET    | /users                 |
|             | PATCH  | /profile               |
| 게시글 잔디 | GET    | /grasses               |

## 사용된 주요 스택
- Node.js
- Express
- MySQL
- Typescript
- dbmate (https://github.com/amacneil/dbmate)

## 버저닝 기준
- [SemVer](http://semver.org/)

## 개발자
- [이우령](https://unleashed-grill-14b.notion.site/332ac2d305e145169a2903cb877ecf6b), [이상윤](https://www.notion.so/b77735f1fe574271b3495719f0e26b5a)