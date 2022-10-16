const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const asyncWrap = require('./utils/async-wrap');

const app = express();
app.use(express.json());


const { DataSource } = require('typeorm');
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
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});


// TODO: 좋아요 API 만들어보기

// user route
app.post('/user', asyncWrap(addUser));

// posting route
app.post('/post', asyncWrap(addPost));
app.get('/post', asyncWrap(getPostAll));
app.patch('/post/:id', asyncWrap(patchPost));
app.delete('/post/:id', asyncWrap(deletePost));
app.get('/post/user/:id', asyncWrap(getPostByUserId));

// error handling 미들웨어
app.use((err, req, res, next) => {
  let responseInfo = err;
  if (err.sqlMessage) {
    responseInfo = {status: 500, message: "failed"};
  }
  res.status(responseInfo.status || 500).send({ message: responseInfo.message || '' });
});

// register user
async function addUser(req, res) {
  const { email, nickname, password, profile_image = 'none'} = req.body;
  if (!email | !nickname | !password) {
    throw {status: 400, message: "plz fill 'email, nickname, password"};
  }

  await dataSource.query(
      `INSERT INTO users(
                          email,
                          nickname,
                          password,
                          profile_image
                        ) VALUES (?, ?, ?, ?);
                        `,
      [email, nickname, password, profile_image]
    )
    .catch(() => {
      throw {status: 500, message: "sql failed"};
    });

  res.status(201).json({ message: "successfully created" });
};

async function addPost(req, res) {
  const { contents, image_url, user_id} = req.body;
  if (!contents | !image_url) {
    throw {status: 400, message: "plz fill out 'contents, image_url'"};
  }

  const answer = await dataSource.transaction(async (transactionalEntityManager) => {
    // execute queries using transactionalEntityManager
    const posting = await transactionalEntityManager.query(
      `INSERT INTO postings(
                          contents,
                          user_id
                        ) VALUES (?, ?);
                        `,
      [contents, user_id]
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

async function getPostAll(req, res) {
  const answer = await dataSource
    .query(
      `SELECT
        users.id AS userId,
        users.profile_image AS userProfileImage,
        postings.id AS postingId,
        posting_images.image_url AS postingImageUrl,
        postings.contents AS postingContent

        FROM postings
        JOIN users ON postings.user_id = users.id
        JOIN posting_images ON posting_images.posting_id = postings.id
    `);
    res.status(201).json({ data: answer });
}

async function getPostByUserId(req, res) {
  const userId = req.params.id;
  const answer = await dataSource
    .query(
      `SELECT
        users.id AS userId,
        users.profile_image AS userProfileImage,
        postings.id AS postingId,
        posting_images.image_url AS postingImageUrl,
        postings.contents AS postingContent

        FROM postings
        JOIN users ON postings.user_id = users.id
        JOIN posting_images ON posting_images.posting_id = postings.id

        WHERE users.id = ?
      `,
      [userId])
    .then((answer) => {
      if (!answer) {
        return answer;
      }
      return {
        userId: answer[0].userId,
        userProfileImage: answer[0].userProfileImage,
        postings: [...answer].map((post) => {
          return {
            postingId : post.postingId,
            postingImageUrl: post.postingImageUrl,
            postingContent: post.postingContent
          }
        })
      }
      ;
    });

  res.status(201).json({ data: answer });
}

async function patchPost(req, res) {
  const postId = req.params.id;
  const { contents, image_url } = req.body;
  if (!contents | !image_url) {
    throw {status: 400, message: "plz fill out 'contents, image_url'"};
  }

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
      return await getPost(postId);
  });

  res.status(200).json({data: answer});
}

async function deletePost(req, res) {
  const postId = req.params.id;

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

async function getPost(postId) {
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
        users.id AS userId,
        users.nickname AS userName,
        postings.id AS postingId,
        posting_images.image_url AS postingImageUrl,
        postings.contents AS postingContent

        FROM postings
        JOIN users ON postings.user_id = users.id
        JOIN posting_images ON posting_images.posting_id = postings.id

        WHERE postings.id = ?
      `,
    [postId]);
}

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


