import dataSource from './database';

async function addCommentOnPost(userId: string, postId: string, comment: string) {
  return await dataSource.query(`
    INSERT INTO comments(
      comment,
      posting_id,
      user_id
      )
    VALUES(?, ?, ?);`
  , [comment, postId, userId])
}

async function findCommentById(commentId: string) {
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
  return comment as {comment: string, poast_id: string, created_at: string, updated_at: string, user_nickname: string, user_id: string, };
}

async function updateComment(commentId: string, comment: string) {
  await dataSource.query(`
      UPDATE comments
        SET comment = ?
      WHERE id = ?`
      , [comment, commentId]
    )
}

async function deleteComment(commentId: string) {
  await dataSource.query(`
    DELETE FROM
      comments
    WHERE id = ?`
    ,[commentId])
}

export default {
  addCommentOnPost,
  findCommentById,
  updateComment,
  deleteComment,
}