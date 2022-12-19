import dataSource from './database';

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
      users.username,
      cmt.comment_content,
      cmt.comments_id,
      cmt.depth,
      cmt.sequence,
      cmt.created_at,
      cmt.is_secret
    FROM
      comments as cmt
    JOIN company_posts as cp ON cp.id = cmt.company_posts_id
    JOIN users ON users.id = cmt.users_id
    WHERE cmt.company_posts_id = ?
    ORDER BY IF(ISNULL(cmt.comments_id), cmt.id, cmt.comments_id), sequence
    LIMIT ${pagenation}, 20
  `, [postId])
  return result as CommentType;
}

const updateComment = async (commentId: number, comment: string, is_secret: number) => {
  await dataSource.query(`
    UPDATE comments
      SET comment_content = ?
    WHERE
      id = ?
  `, [comment, commentId]);
  await dataSource.query(`
    UPDATE comments
      SET is_secret = ?
    WHERE
      id = ?
  `, [is_secret, commentId])
}

const changeCommentToDelete = async (commentId: number) => {
  await dataSource.query(`
    UPDATE comments
      SET comment_content = '삭제된 메세지입니다'
    WHERE
      id = ?
  `, [commentId])
}

const deleteComment = async (commentId: number) => {
  await dataSource.query(`
    DELETE FROM
      comments
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

const getPostWriter = async (postId: number) => {
  const [result] = await dataSource.query(`
    SELECT
      users_id
    FROM
      company_posts
    WHERE
      id = ?
  `, [postId])
  return result as {users_id: number}
}

const getLengthOnPost = async (postId: number) => {
  const [result] = await dataSource.query(`
    SELECT
      count(*) as len
    FROM
      comments
    WHERE
      company_posts_id = ?
  `, [postId])
  return result
}

export default {
  addCommentOnPost,
  addCommentOnComment,
  getCommentOnPost,
  updateComment,
  changeCommentToDelete,
  deleteComment,
  findUserByCommentId,
  findSEQByCommentId,
  getCommentCountByPostId,
  getPostWriter,
  getLengthOnPost,
}