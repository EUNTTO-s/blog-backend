import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import {asyncWrap, checkDataIsNotEmpty} from './utils/myutils';

const app = express();
app.use(express.json());

import morgan from 'morgan';
app.use(morgan('combined'));

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { DataSource } from 'typeorm';

// in .env file
// TYPEORM_CONNECTION = mysql
// TYPEORM_HOST = 127.0.0.1
// TYPEORM_USERNAME = root
// TYPEORM_PASSWORD = sqlPassword
// TYPEORM_DATABASE = dbmate_test
// TYPEORM_PORT = 3306
// TYPEORM_LOGGING =TRUE

// DATABASE_URL = "mysql://root:sqlPassword@127.0.0.1:3306/justgram"

const dataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

// user route
app.post('/user', asyncWrap(addUser));
app.get('/user',  asyncWrap(authMiddleware),  asyncWrap(adminMiddleware), asyncWrap(getAllUser));
// user login route
app.post('/login', asyncWrap(login));

// TODO 대댓글 추가해보기
// comments route
  // create comment
app.post('/post/comment', asyncWrap(authMiddleware), asyncWrap(addCommentOnPost));
  // read comment
app.get('/post/comment/:id', asyncWrap(getCommentOnPost));
  // update comment
app.patch('/post/comment', asyncWrap(authMiddleware), asyncWrap(updateCommentOnPost));
  // delete comment
app.delete('/post/comment', asyncWrap(authMiddleware), asyncWrap(deleteCommentOnPost));


// posting route
app.post('/post', asyncWrap(authMiddleware), asyncWrap(addPost));
app.get('/post', asyncWrap(getPostAll));
app.patch('/post/:id', asyncWrap(authMiddleware), asyncWrap(patchPost));
app.delete('/post/:id', asyncWrap(authMiddleware), asyncWrap(deletePost));
app.get('/post/:id', asyncWrap(getPost));
app.get('/post/user/:id', asyncWrap(getPostsByUserId));

// likes route
app.post('/post/:id/like', asyncWrap(authMiddleware), asyncWrap(addLikePost));

// test
app.get('/test', asyncWrap(authMiddleware), asyncWrap(test));

async function getAllUser(req: express.Request, res: express.Response) {
  const allUsers = await dataSource.query(`
    SELECT
      id,
      email,
      nickname
    FROM users
  `);
  res.send(allUsers);
}

async function login(req: express.Request, res: express.Response) {
  const {email, password} = req.body;
  checkDataIsNotEmpty({email, password});

  // 매칭되는 유저가 있는 지 확인
  const [userInfo] = await dataSource.query(`
    SELECT
      id,
      password
    FROM users
    WHERE
    email = ?
  `, [email]);
  // 있으면 토큰 발행
  if (!userInfo) {
    throw {status: 404, message: '등록되지 않은 이메일이에요.'}
  }
  // 비밀번호가 다른 지 확인
  else if (!bcrypt.compareSync(password, userInfo.password)) {
    throw {status: 404, message: '비밀번호가 달라요.'}
  }
  const makeToken = jwt.sign({ id: userInfo.id }, 'server_made_secret_key', { expiresIn: '24h' });
  res.status(200).send({message: 'login Success' ,token: makeToken});
}


// error handling 미들웨어
const errorHandler: express.ErrorRequestHandler =
    (err: MyError, req, res, next) => {
      console.log("ERROR LOG~~!:");
      // 흐름상 에러가 검출되면 로그 표시 및 클라이언트에게 전달
      let responseInfo = err;
      if (err.sqlMessage) {
        console.log(err.sqlMessage);
        responseInfo = {status: 500, message: "failed"};
      }
      console.log("err LOG:", err);
      res.status(responseInfo.status || 500).send({ message: responseInfo.message || '' });
    };
app.use(errorHandler);

//
// 이하 기능 로직 함수 선언, 구현
//


// register user
async function addUser(req: express.Request, res: express.Response) {
  const { email, nickname, password, profile_image = 'none'} = req.body;
  checkDataIsNotEmpty({email, nickname, password});


  // 1. 중복되는 유저 있는 지 확인
  const [searchResult] = await dataSource.query(`
    SELECT id FROM users WHERE email = '${email}'
  `);
  if (searchResult) {
    throw {status: 400, message: '이미 해당 이메일이 등록되어있어요 '};
  }

  // 2. 중복되는 유저가 없으면 추가
  await dataSource.query(
      `INSERT INTO users(
                          email,
                          nickname,
                          password,
                          profile_image
                        ) VALUES (?, ?, ?, ?);
                        `,
      [email, nickname, await makeHash(password), profile_image]
    )
    .catch(() => {
      throw {status: 500, message: "sql failed"};
    });

  res.status(201).json({ message: "successfully created" });
};

async function addPost(req: express.Request, res: express.Response) {
  const { contents, image_url} = req.body;
  const userId = req.userInfo.id;
  // 1. 비어있는 지 확인
  checkDataIsNotEmpty({contents, image_url, userId});

  await dataSource.transaction(async (transactionalEntityManager) => {
    // execute queries using transactionalEntityManager
    const posting = await transactionalEntityManager.query(
      `INSERT INTO postings(
                          contents,
                          user_id
                        ) VALUES (?, ?);
                        `,
      [contents, userId]
    );
    await transactionalEntityManager.query(
      `INSERT INTO posting_images(
                        posting_id,
                        image_url
                        ) VALUES (?, ?);
                        `,
      [posting.insertId, image_url]
    );
    return posting;
    });

  res.status(201).json({ message: "successfully created" });
}

async function getPostAll( req, res: express.Response) {
  const answer = await dataSource
    .query(
      `SELECT
      users.id AS user_id,
      users.profile_image AS user_profile_image,
      JSON_ARRAYAGG(JSON_OBJECT("image_url_list", posts.image_list, "id", posts.id, "content", content))
        AS post_list

      FROM users

      JOIN (
        SELECT
          postings.id,
          postings.user_id,
          postings.contents AS content,
          pi.post_imgs AS image_list
        FROM
          postings
        JOIN (
          SELECT
            posting_id,
            JSON_ARRAYAGG(image_url) AS post_imgs
          FROM
            posting_images
          GROUP BY
            posting_id
        ) pi ON pi.posting_id = postings.id
      ) posts ON posts.user_id = users.id

      GROUP BY users.id
  `)
    .then((answer) => {
      return [...answer].map((userWithPost)=> {
        return {...userWithPost, post_list: JSON.parse(userWithPost.post_list) }
      })
    });

  res.status(201).json({ data: answer });
}

async function getPostsByUserId(req: express.Request, res: express.Response) {
  const userId = req.params.id;
  const answer = await dataSource
  // 한 유저에 대한 포스트 리스트 찾기
    .query(
      `SELECT
      users.id AS user_id,
      users.profile_image AS user_profile_image,
      JSON_ARRAYAGG(JSON_OBJECT("image_url_list", posts.image_list, "id", posts.id, "content", content))
        AS post_list

      FROM users
      -- 게시물을 가져옴(게시물 이미지 리스트 테이블을 엮은)
      JOIN (
        SELECT
          postings.id,
          postings.user_id,
          postings.contents AS content,
          pi.post_imgs AS image_list
        FROM
          postings
        JOIN (
          SELECT
            posting_id,
            JSON_ARRAYAGG(image_url) AS post_imgs
          FROM
            posting_images
          GROUP BY
            posting_id
        ) pi ON pi.posting_id = postings.id
        WHERE postings.user_id = ?
      ) posts ON posts.user_id = users.id

      GROUP BY users.id
  `,
      [userId])
    .then((answer) => {
      return [...answer].map((userWithPost)=> {
        return {...userWithPost, post_list: JSON.parse(userWithPost.post_list) }
      })
    });

  res.status(201).json({ data: answer });
}

async function patchPost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const { contents, image_url } = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({ contents, image_url, userId });

  // 수정하려는 게시글의 작성자가 맞는 지?
  const searchResult = await dataSource.query(`
    SELECT id
      FROM postings
    WHERE id = ? AND user_id = ?
  `, [postId, userId]);

  if (!searchResult) {
    throw {status: 403, message: "해당 글 작성자만 변경할 수 있습니다"}
  }

  // 맞다면 변경
  const answer = await dataSource.transaction(
    async (transactionalEntityManager) => {
      // patch contents
      if (contents) {
        await transactionalEntityManager.query(
          `UPDATE postings
              SET contents = ?
            WHERE postings.id = ?
          `,
          [contents, postId]
        );
      }
      // patch image_url
      if (image_url) {
          // 먼저 기존 image_url을 전부 지움
        await transactionalEntityManager.query(
          `DELETE FROM posting_images
            WHERE posting_images.posting_id = ?;`
          ,[postId]);

          // 이후 image_url을 업데이트함.
        await transactionalEntityManager.query(
          `INSERT INTO posting_images(
            posting_id,
            image_url
          ) VALUES (?, ?);`
          ,[postId, image_url]);
      }
      return await getPostByPostId(postId);
  });

  res.status(200).json({data: answer});
}

async function deletePost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const userId = req.userInfo.id;

  checkDataIsNotEmpty({postId, userId});

  // 삭제하려는 게시글의 작성자가 맞는 지?
  const searchResult = await dataSource.query(`
    SELECT id
      FROM postings
    WHERE id = ? AND user_id = ?
  `, [postId, userId]);

  if (!searchResult) {
    throw {status: 403, message: "해당 글 작성자만 삭제할 수 있습니다"}
  }


  const answer = await dataSource.transaction(
    async (transactionalEntityManager) => {
      await transactionalEntityManager.query(
        `DELETE FROM posting_images
        WHERE posting_images.posting_id = ?;`
      ,[postId])

      const result = await transactionalEntityManager.query(
        `DELETE FROM postings
        WHERE postings.id = ?;`
      ,[postId])

      if (!result.affectedRows) {
        throw {status: 404, message: "postID에 해당하는 포스트가 존재하지 않습니다"};
      }
      return {status: 200, message: "successfully deleted"};
  });

  res.status(answer.status).json({ message: answer.message });
}

async function getPost(req: express.Request, res: express.Response) {
  const userId = req.params.id;
  const answer = await getPostByPostId(userId);
  res.status(200).json({data: answer});
}
async function getPostByPostId(postId: string | number) {
  /*
  아래와 같은 값을 반환함.
  {
    "userId": 9,
    "userName": "피리",
    "postingId": 56,
    "postingImageUrl": "PATCH123.jpg",
    "postingContent": "patchTEST123"
  }
  */
  return await dataSource
    .query(
      `SELECT
        postings.id,
        postings.user_id,
        postings.contents AS content,
        pi.post_imgs AS image_list
      FROM
        postings
      JOIN (
        SELECT
          posting_id,
          JSON_ARRAYAGG(image_url) AS post_imgs
        FROM
          posting_images
        GROUP BY
          posting_id
      ) pi ON pi.posting_id = postings.id
      WHERE postings.id = ?
      `,
    [postId])
    .then((answer) => {
      if (!answer.length)
        throw {status: 404, message: "there is no matched result"};

      const post = answer[0].image_list && answer[0];
      return {...post, image_list: JSON.parse(post.image_list)}
    })
}

function decodeToken(token: string) {
  try {
    return jwt.verify(token, 'server_made_secret_key');
  } catch (err) {
    console.log(`err: ${err}`);
    throw {status: 401, message: "unauthorized"}
  }
}

// 유저 정보 찾기
async function findUser(userId: number | string) {
  let [userInfo] = await dataSource.query(`
    SELECT
      id,
      email,
      nickname
    FROM users
    WHERE users.id = ?
  `, [userId])
  .catch((err) => {
    throw {status: 400, message: err.message || '인증 실패'}
  })
  if (!userInfo) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }
  return userInfo;
}

async function authMiddleware(...[req, _, next] : Parameters<express.RequestHandler>) : Promise<any> {
	const token = req.headers.authorization;
	const decodedToken = decodeToken(token);
  const userInfo = await findUser(decodedToken.id);
  req.userInfo = userInfo;
  next();
}

async function adminMiddleware(...[req, _, next] : Parameters<express.RequestHandler>) : Promise<any> {
  const userInfo = req.userInfo;
  if (userInfo.email != "sororiri@gmail.com") {
    throw {status: 403, message: "not permitted"};
  }
  next();
}

async function makeHash(password : string) {
  return await bcrypt.hash(password, 10)
}

async function test(...[req, res] : Parameters<express.RequestHandler>) : Promise<any> {
  console.log(`userInfo: ${JSON.stringify(req.userInfo)}`);
  res.send("TEST");
}

async function addLikePost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const postId = req.params.id;
  const {like} = req.body;
  const queryText = like ?
      (`
        INSERT INTO
          likes_postings_users(
            user_id,
            posting_id
          )
        VALUES(?, ?)
        ON DUPLICATE KEY
          UPDATE
            user_id=user_id,
            posting_id=posting_id
      `)
    :
      (`
        DELETE FROM
          likes_postings_users
        WHERE user_id = ? AND posting_id = ?
      `);
  await dataSource.query(queryText, [userId, postId])
  res.send(`success to ${like? "like" : "remove like"}`);
}

async function addCommentOnPost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {comment, postId} = req.body;

  // 1. 빈 값이 없는 지 확인
  checkDataIsNotEmpty({comment, postId, userId});

  // 2. 아이디가 존재하는 지 확인
  findUser(userId);

  // 3. 게시글 추가
  await dataSource.query(`
      INSERT INTO comments(
        comment,
        posting_id,
        user_id
        )
      VALUES(?, ?, ?);`
      , [comment, postId, userId]);
  res.send(`success to add comment`);
}

async function deleteCommentOnPost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId} = req.body;

  // 1. 빈 값이 없는 지 확인
  checkDataIsNotEmpty({commentId, userId});

  // 2. 아이디가 존재하는 지 확인
  findUser(userId);

  const result = await dataSource.query(`
      DELETE FROM
        comments
      WHERE id = ? AND user_id = ?`
      , [commentId, userId]
    )
  console.log(JSON.stringify(result));
  if (!result.affectedRows) {
    throw {status: 404, message: "권한이 없거나 해당 코멘트가 없습니다."};
  }
  res.send(`success to add comment`);
}

async function updateCommentOnPost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId, comment} = req.body;

  // 1. 빈 값이 없는 지 확인
  checkDataIsNotEmpty({commentId, comment, userId});

  // 2. 아이디가 존재하는 지 확인
  findUser(userId);

  const result = await dataSource.query(`
      UPDATE comments
        SET comment = ?
      WHERE id = ? AND user_id = ?`
      , [comment, commentId, userId]
    )
  if (!result.affectedRows) {
    throw {status: 404, message: "권한이 없거나 해당 코멘트가 없습니다."};
  }
  res.send(`success to update comment`);
}

async function getCommentOnPost(req: express.Request, res: express.Response) {
  const commentId = req.params.id;
  console.log(`commentId: `, commentId);
  const [comment] = await dataSource.query(`
      SELECT
        comments.comment,
        postings.id AS post_id,
        comments.created_at,
        comments.updated_at,
        users.nickname as user_nickname,
        users.id as user_id
      FROM comments
      JOIN users    ON comments.user_id     = users.id
      JOIN postings ON comments.posting_id  = postings.id
      WHERE comments.id = ?`
      , [commentId]
    );
  if (!comment) {
    throw {status: 400, message: '해당 코멘트가 존재하지 않습니다'}
  }
  res.send({data: comment});
}

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// JUST EXAMPLE FOR TYPE_선언.
let BUILD_MODE_PRODUCTION  = true;
if (BUILD_MODE_PRODUCTION) {
}