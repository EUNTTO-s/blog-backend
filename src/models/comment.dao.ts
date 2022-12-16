import dataSource from './database';

// async function addCommentOnPost(userId: string, postId: string, comment: string) {
//   return await dataSource.query(`
//     INSERT INTO comments(
//       comment,
//       posting_id,
//       user_id
//       )
//     VALUES(?, ?, ?);`
//   , [comment, postId, userId])
// }

// async function findCommentById(commentId: string) {
//   const [comment] = await dataSource.query(`
//       SELECT
//         comments.comment,
//         postings.id AS post_id,
//         comments.created_at,
//         comments.updated_at,
//         users.nickname as user_nickname,
//         users.id as user_id
//       FROM comments
//       JOIN users    ON comments.user_id     = users.id
//       JOIN postings ON comments.posting_id  = postings.id
//       WHERE comments.id = ?`
//       , [commentId]
//     );
//   return comment as {comment: string, poast_id: string, created_at: string, updated_at: string, user_nickname: string, user_id: string, };
// }

// async function updateComment(commentId: string, comment: string) {
//   await dataSource.query(`
//       UPDATE comments
//         SET comment = ?
//       WHERE id = ?`
//       , [comment, commentId]
//     )
// }

// async function deleteComment(commentId: string) {
//   await dataSource.query(`
//     DELETE FROM
//       comments
//     WHERE id = ?`
//     ,[commentId])
// }

const addCommentOnPost = async (userId: number, postId: number, comment: string, is_secret: number) => {
  await dataSource.query(`
    INSERT INTO comments (
      users_id,
      company_posts_id,
      comment_content,
      depth,
      sequence,
      is_secret
    )
    VALUES (?, ?, ?, ?, ?, ?)`
  , [userId, postId, comment, 1, 1, is_secret])
}

const addCommentOnComment = async (userId: number, postId: number, commentId: number, comment: string, SEQ: number, is_secret: number) => {
  await dataSource.query(`
    INSERT INTO comments (
      users_id,
      company_posts_id,
      comment_content,
      comments_id,
      depth,
      sequence,
      is_secret
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`
  , [userId, postId, comment, commentId, 2, SEQ + 1, is_secret])
}

const getCommentOnPost = async (postId: number, pagenation: number): Promise<any> => {
  const result = await dataSource.query(`
    SELECT
      cmt.id,
      cmt.users_id,
      cmt.comment_content,
      cmt.comments_id,
      cmt.depth,
      cmt.sequence,
      cmt.created_at,
      cmt.is_secret,
      cp.users_id as writer
    FROM
      comments as cmt
    JOIN company_posts as cp ON cp.id = cmt.company_posts_id
    WHERE cmt.company_posts_id = ?
    ORDER BY IF(ISNULL(cmt.comments_id), cmt.id, cmt.comments_id), sequence
    LIMIT ${pagenation}, 20
  `, [postId])
  return result as CommentType;
}

const updateComment = async (commentId: number, comment: string) => {
  await dataSource.query(`
    UPDATE comments
      SET comment_content = ?
    WHERE id = ?
  `, [comment, commentId]);
}

const deleteComment = async (commentId: number) => {
  await dataSource.query(`
    DELETE
      FROM comments
    WHERE
      id = ?
  `, [commentId])
}

const findUserByCommentId = async (commentId: number) : Promise<CommentType> => {
  const [result] = await dataSource.query(`
    SELECT
      users_id
    FROM
      comments
    WHERE
      id = ?
  `, [commentId])
  return result as {users_id: number};
}

const findSEQByCommentId = async (commentId: number) => {
  const [result] = await dataSource.query(`
    SELECT
      max(sequence) as SEQ
    FROM
      comments
    WHERE
      id = ? or comments_id = ?
  `, [commentId, commentId])
  return result as {SEQ: number}
}

const getCommentCountByPostId = async (postId: number) => {
  const [result] = await dataSource.query(`
    SELECT
      count(id) as count
    FROM
      comments
    WHERE
      company_posts_id = ?
  `, [postId])
  return result as {count: number}
}

export default {
//   addCommentOnPost,
//   findCommentById,
//   updateComment,
//   deleteComment,
  addCommentOnPost,
  addCommentOnComment,
  getCommentOnPost,
  updateComment,
  deleteComment,
  findUserByCommentId,
  findSEQByCommentId,
  getCommentCountByPostId
}