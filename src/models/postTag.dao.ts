import dataSource from "./database";

const createPostTags = async (postId: number, tagId: number) => {
  const answer = await dataSource.query(
    `
    INSERT INTO
      posts_tags(
        posts_id,
        tags_id
      )
    VALUES
      (?,?)
    `,
    [postId, tagId]
  );
  return answer;
};

const deletePostTags = async (postId: number) => {
  await dataSource.query(`
  DELETE FROM
    posts_tags
  WHERE
    posts_id = ?
  `, [postId]
  );
}

export default {
  createPostTags,
  deletePostTags,
};
