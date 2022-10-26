import dataSource from './database';

async function addPost(contents: string, image_url: string, userId: string) {
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
}

async function getAllPost() {
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
  return answer;
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
      return {...post, image_list: JSON.parse(post.image_list)} as {
        userId: number, userName: string, postingId: number, postingContent: string, postingImageUrl: string[]
      }
    })
}

async function updatePost(postId: string, contents: string, imageUrl: string) {
  return await dataSource.transaction(
    async (transactionalEntityManager) => {
      // patch contents
      const result = await transactionalEntityManager.query(
        `UPDATE postings
            SET contents = ?
          WHERE postings.id = ?
        `,
        [contents, postId]
      );
      // patch image_url
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
        ,[postId, imageUrl]);
      return result;
  });
}

async function deletePost(postId: string) {
  await dataSource.transaction(
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
  });
}

async function getPostsByUserId(userId: string) {
  return await dataSource
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
}

async function addLikePost(userId: string, postId: string) {
  await dataSource.query(`
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
  `, [userId, postId]);
}

export default {
  addPost,
  getAllPost,
  getPostByPostId,
  updatePost,
  deletePost,
  getPostsByUserId,
  addLikePost,
}