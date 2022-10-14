# JUSTGRAM Node Mission
| 💡 순서에 맞게 Node.js 환경에서 스타벅스 프로젝트에 필요한 API를 생성하는 과제입니다. 구글 클래스룸으로 제출하는 과제와, github에 push 하는 과제가 섞여있으니 유의해주세요.

## [Mission 1] | SQL을 활용하여 인스타그램 데이터베이스 구축하기
**SQL문을 이용해, 모델링한 결과를 토대로 인스타그램 데이터베이스를 구축해봅니다.**

### STEP 1
- MySQL에 justgram 이라는 데이터베이스를 생성해주세요.

### STEP 2

**`justgram`에는 총 4개의 테이블이 있습니다.**

- 유저를 저장하는 테이블 : `users(id, email, nickname, password, profile_image, created_at)`
- 포스팅을 저장하는 테이블 : `postings(id, user_id, contents, created_at)`
- 포스팅 이미지를 저장하는 테이블 : `posting_images(id, posting_id, image_url, created_at)`
- 포스팅에 포함된 댓글을 저장하는 테이블 : `comments(id, comment, posting_id, user_id, created_at)`

**각 테이블과 컬럼의 세부 속성은 아래와 같습니다.**

```sql
Table users {
  id int [pk, increment] // auto-increment
  email varchar(100) [unique, not null]
	nickname varchar(50)
	password varchar(300) [not null]
  profile_image varchar(3000)
  created_at datetime [default: `now()`]
}

Table postings {
  id int [pk, increment] // auto-increment
  user_id int [not null]
  contents varchar(2000) [null]
  created_at datetime [default: `now()`]
}
Ref: postings.user_id > users.id

Table posting_images {
	id int [pk, increment]
	posting_id int [not null]
	image_url varchar(3000)
	created_at datetime [default: `now()`]
}
Ref: posting_images.posting_id > postings.id

Table comments {
	id int [pk, increment]
	comment varchar(2000)
	posting_id int [not null]
	user_id int [not null]
  created_at datetime [default: `now()`]
}
Ref: comments.posting_id > postings.id
Ref: comments.user_id > users.id
```

### STEP 3

**SQL `INSERT INTO` 문을 활용하여 각각의 테이블 안에 아래 데이터를 추가해주세요.**

- users
    
    
    | id | email | nickname | password | profile_image |
    | --- | --- | --- | --- | --- |
    | 1 | codeKim@justcode.co.kr | codeKim | c0DeK!m | http://profile_image_1.jpeg |
    | 2 | codeLee@justcode.co.kr | codeLee | C0dEL22 | http://profile_image_2.jpeg |
    | 3 | codePark@justcode.co.kr | codePark | P@rkCOdE! | http://profile_image_3.jpeg |
    | 4 | codeChoi@justcode.co.kr | codeChoi | ChoiCodDE | http://profile_image_4.jpeg |
- postings
    
    
    | id | user_id | contents |
    | --- | --- | --- |
    | 1 | 1 | 작은 성공이 주는 성취감으로 하루를 마무리 할 수 있기를 ❣️ |
    | 2 | 1 | 오늘은 코딩하기 좋은날 🌷 |
    | 3 | 2 | db 모델링이 정말 재밌어요 ㅎㅎ |
    | 4 | 2 | 어려워도 우린 결국 해낼겁니다. |
- posting_images
    
    
    | id | posting_id | image_url |
    | --- | --- | --- |
    | 1 | 1 | http://posting_1_image_1.jpeg |
    | 2 | 1 | http://posting_1_image_2.jpeg |
    | 3 | 2 | http://posting_2_image_1.jpeg |
    | 4 | 3 | http://posting_3_image_1.jpeg |
    | 5 | 3 | http://posting_3_image_2.jpeg |
    | 6 | 3 | http://posting_3_image_3.jpeg |
    | 7 | 4 | http://posting_4_image_1.jpeg |
- comments
    
    
    | id | posting_id | comment | user_id |
    | --- | --- | --- | --- |
    | 1 | 1 | 작은 성공이 모여 큰 성취가 되니까요! | 3 |
    | 2 | 4 | 같이 힘냅시다 | 1 |
    | 3 | 2 | 햇살이 너무 좋아서 코딩하고 싶지 않아요 | 2 |
    | 4 | 2 | 지금 비오는걸요 | 4 |
    | 5 | 3 | 모델링 최고! 생각하는거 너무 재밌죠 | 3 |
    | 6 | 4 | 언제나 길이 있기 마련입니다. | 1 |
    | 7 | 1 | 자다가 코딩하는 꿈꿀 것 같아요 | 4 |
    
### STEP 4


**아래의 결과를 확인해보고, JOIN 문의 의미에 대해 해석해주세요.**

```sql
SELECT users.nickname, users.profile_image, postings.contents
FROM users
JOIN postings ON postings.user_id = users.id
```

```sql
SELECT users.name, users.profile_image, postings.contents, comments.comment
FROM users
JOIN postings ON postings.user_id = users.id
JOIN comments ON comments.posting_id = postings.id
```

그렇다면, 

1번 **users의 이름과, 1번 users의 profile_image, 1번 user가 남긴 posting, 해당 posting에 포함된 댓글, 그리고 포함된 posting_images까지 불러오고자 한다면 어떤 SQL를 작성해야할까요?**

### STEP 5


**위 과정을 진행하며 공부한 다양한 join 문들의 차이점과 각각 사용되는 상황을 구체적인 예시와 함께 블로깅해주세요.**


## [Mission 2] typeORM을 활용하여 서버와 데이터베이스 연결하기
- 과제 설명
        
    Express 환경에서 인스타그램과 같은 소셜 미디어 플랫폼 제작에 필요한 API를 생성하는 과제입니다.  각 Mission을 순서 대로 진행하여 Github에 푸시해주세요.
    
    - Express 초기 환경 설정
    
    학습자료 중 Express 초기 환경 세팅 가이드에 정리된 내용과 동일하게 프로젝트 환경을 설정해주세요.
    
    - Express 초기 환경설정 다음의 내용을 초기 환경 설정에 추가하여서 적용해주세요.
        1. `Express` 설치 / 적용
        2. `nodemon` 설치 / 적용
        3. `cors 설치` / 적용
        4. `dotenv` 설치 / 환경 변수 적용
        5. `morgan` 설치 / 적용
    
    - TypeORM / dbConnection 설정
        
        학습자료 중 TypeORM 파트에 정리된 내용과 동일하게 프로젝트 환경을 설정해주세요.
        
    - Express 초기 환경설정 다음의 내용을 초기 환경 설정에 추가하여서 적용해주세요.
        1. `TypeORM` 설치 및 적용
        2. `dbConnection` 정상 작동 확인
 
 ### [Mission 3] 유저 회원가입 하기

- 과제 설명
    - 과제 설명
        
        http 통신을 이용하여, 한 명 이상의 유저를 회원가입 해봅니다. **`Express`** 를 이용해 가상의 justgram 서비스에 회원가입을 완료해주세요. 이 때 별도의 모듈화 없이 하나의 파일 (server.js) 에서 모든 코드를 작성합니다.
        
    - 회원가입 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 알맞은 http 메소드를 선정하여서 유저의 정보를 백엔드 서버에 전달해주세요.
        3. 데이터가 생성됬을 때에 알맞는 http 상태코드를 반환해주세요.
        4. 데이터가 잘 db에 저장되었는지 여부를 테이블 스크린샷을 찍어서 PR에 같이 첨부하여 올려주세요.
        5. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
            
            ```
            {
              "message" : "userCreated"
            }
            
            ```
            
### [Mission 4] 게시글 C.R.U.D

- 과제 설명
    
    ### Create
    
    - http 통신을 이용하여, 두 건 이상의 게시글을 등록해봅니다. 이 때 앞서 작성하였던 파일 (app.js) 에서 이어서 코드를 작성합니다.
        - 게시글 등록 API
            1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
            2. 알맞은 http 메소드를 선정하여서 게시글 내용 및 유저의 id 값을 백엔드 서버에 전달해주세요.
            3. 데이터가 생성됬을 때에 알맞는 http 상태코드를 반환해주세요.
            4. 데이터가 잘 db에 저장되었는지 여부를 테이블 스크린샷을 찍어서 PR에 같이 첨부하여 올려주세요.
            5. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
                
                ```json
                {
                  "message" : "postCreated"
                }
                ```
                
        
        ### Read
        
        - http 통신을 이용하여, 게시글 전체 리스트를 불러와봅니다. 이 때 앞서 작성하였던 파일 (app.js) 에서 이어서 코드를 작성합니다.
        - 게시글 리스트 불러오기 API
            1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
            2. 데이터가 호출될 때의 알맞는 http 상태코드를 반환해주세요.
            3. http response로 반환하는 데이터의 형태는 다음과 같습니다.
                
                ```json
                {
                    "data" : [
                	{
                	    "userId"           : 1,
                	    "userProfileImage" : "userProfileImage1",
                      "postingId"        : 1,
                      "postingImageUrl"  : "imageUrlSample1",
                	    "postingContent"   : "sampleContent1"
                	},
                	{
                	    "userId"           : 2,
                	    "userProfileImage" : "userProfileImage2",
                      "postingId"        : 2,
                      "postingImageUrl"  : "imageUrlSample2",
                	    "postingContent"   : "sampleContent2"
                	},
                	{
                	    "userId"           : 3,
                	    "userProfileImage" : "userProfileImage3",
                      "postingId"        : 3,
                      "postingImageUrl"  : "imageUrlSample3",
                	    "postingContent"   : "sampleContent3"
                	},
                	{
                	    "userId"           : 4,
                	    "userProfileImage" : "userProfileImage4",
                      "postingId"        : 4,
                      "postingImageUrl"  : "imageUrlSample4",
                	    "postingContent"   : "sampleContent4"
                	}
                ]}
                
                ```
                
    
    ### Read 2
    
    - http 통신을 이용하여, 한명의 유저가 작성한 게시글을 불러옵니다. 이 때 앞서 작성하였던 파일 (app.js) 에서 이어서 코드를 작성합니다.
    - 특정 유저가 작성한 게시글 상세 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 하나의 유저가 올린 여러개의 게시글을 보여주는 상세 페이지용 API를 작성해주세요.
        3. 데이터가 호출될 때에 알맞는 http 상태코드를 반환해주세요.
        4. Http response로 반환하는 데이터의 형태는 다음과 같습니다.
            
            ```json
            {
                "data" : {
                    "userId"           : 1,
            				"userProfileImage" : "userProfileImage1",
            				"postings" : [{
            		        "postingId"        : 1,
            		        "postingImageUrl"  : "postingImageUrlSample1",
            		        "postingContent"   : "samplePostingContent1"
            		     },{
            		        "postingId"        : 2,
            		        "postingImageUrl"  : "postingImageUrlSample2",
            		        "postingContent"   : "samplePostingContent2"
            		     },{
            		        "postingId"        : 3,
            		        "postingImageUrl"  : "postingImageUrlSample3",
            		        "postingContent"   : "samplePostingContent3"
                    }]
                }
            }
            
            ```
            
    
    ### Update
    
    - 게시글 정보 수정 엔드포인트 요구 사항
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 데이터베이스에 저장되어있는 1번 id 유저의 1번 id 게시글을 확인합니다. 이후 해당 내역의 content를 기존의 데이터와 다른 내용으로 수정하여 저장합니다.
        3. postingId가 1번인 게시물의 내용을 “기존과 다르게 수정한 내용입니다.”로 수정한다면, 데이터베이스에서 끌어와 http response로 반환하는 데이터의 형태는 다음과 같습니다.
            
            ```json
            {
            	"data" : {
            	    "userId"           : 1,
            	    "userName"         : "weCode",
                  "postingId"        : 1,
                  "postingTitle"     : "간단한 HTTP API 개발 시작!",
            	    "postingContent"   : "기존과 다르게 수정한 내용입니다."
            	}
            }
            ```
            
    
    ### Delete
    
    - 과제 설명
        
        http 통신을 이용하여, 한 건의 게시글을 삭제해봅니다. 이 때 앞서 작성하였던 파일 (app.js) 에서 이어서 코드를 작성합니다.
        
    - 게시글 삭제 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 데이터가 삭제 될 때에 알맞는 http 상태코드를 반환해주세요.
        3. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
            
            ```json
            {
            	"message" : "postingDeleted"
            }
            ```
            
    
    ### 선택과제 - 좋아요 누르기
    
    - 과제 설명
        - http 통신을 이용하여, 한 건의 좋아요를 생성해봅니다. 이 때 앞서 작성하였던 파일 (app.js) 에서 이어서 코드를 작성합니다.
    - 게시글 좋아요 누르기 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 데이터가 생성 됬을 때 (좋아요가 눌렸을 때의) 알맞는 http 상태코드를 반환해주세요.
        3. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
        
 ### [Mission 5] 비밀 번호 암호화

- 과제 설명
    - 과제 설명
        
        http 통신을 이용하여, 한 명 이상의 유저를 회원가입 해봅니다. **`Express`** 를 이용해 가상의 justgram 서비스에 회원가입을 완료해주세요. 이 때 별도의 모듈화 없이 하나의 파일 (server.js) 에서 모든 코드를 작성합니다.
        
    - 회원가입 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 알맞은 http 메소드를 선정하여서 유저의 정보를 백엔드 서버에 전달해주세요.
        3. 백엔드에서 해당 비밀번호를 암호화하여 저장해주세요.
        4. 데이터가 잘 db에 저장되었는지 여부를 테이블 스크린샷을 찍어서 PR에 같이 첨부하여 올려주세요.
        5. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
            
            ```
            {
              "message" : "userCreated"
            }
            
            ```
            
 ### [Mission 6] 유저 로그인하기

- 과제 설명
    - 과제 설명
        
        http 통신을 이용하여, 한 명 이상의 유저를 회원가입 해봅니다. **`Express`** 를 이용해 가상의 justgram 서비스에 로그인을 완료해주세요. 이 때 별도의 모듈화 없이 하나의 파일 (server.js) 에서 모든 코드를 작성합니다.
        
    - 회원가입 API
        1. 알맞은 API 호출 URL을 설정하여서 클라이언트와(httpie/postman) 통신을 성공해주세요.
        2. 알맞은 http 메소드를 선정하여서 유저의 정보를 백엔드 서버에 전달해주세요.
        3. 백엔드에서는 가입되어 있는 유저인지 확인 후, 가입되어 있지 않은 유저라면 에러를 전달합니다. 404, userDoesNotExist
            
            ```
            {
              "message" : "userDoesNotExist"
            }
            
            ```
            
        4. 가입되어 있는 유저라면 해당 유저의 id로 만들어진 jwt를 발행해주세요.
        5. http response로 반환하는 JSON 데이터의 형태는 다음과 같습니다.
            
            ```
            {
              "message" : "loginSuccess",
              "token": "ey_________"
            }
            
            ```
            
  ---
  
  ### [추가 Mission 1] CRUD - Create & Delete (음료 Like 기능)

- 유저가 특정 음료에 좋아요를 누를 수 있습니다.
- 좋아요를 눌렀던 상태에서 다시 좋아요를 누르면 좋아요가 사라집니다.
- Hint
    - `좋아요`를 관리하는 테이블이 필요합니다.
    
 ### [추가 Mission 2]  CRUD - comments or reviews

- 특정 유저는 특정 음료에 댓글 (리뷰) 를 달 수 있습니다.
- 리뷰를 남긴 시각을 기록합니다.
- 내 리뷰는 내가 수정할 수 있습니다.
- 내 리뷰는 내가 삭제할 수 있습니다.
- 내 리뷰는 다른 사람이 삭제하거나 수정할 수 없습니다.
- 심화
    - 대댓글을 달 수 있습니다.
    - 내 댓글을 바라보고 있는 추가 댓글을 달 수 있습니다.
    
