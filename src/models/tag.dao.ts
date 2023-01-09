import dataSource from "./database";

const createTags = async (tagName: string) => {
  const answer = await dataSource.query(
    `
    INSERT INTO
      tags(
        tag_name
      )
    VALUES
      (?)
    `,
    [tagName]
  );
  return answer;
};

const getTags = async (tagName: string) => {
  const tags = await dataSource.query(
    `
    SELECT
      id,
      tag_name
    FROM
      tags
    WHERE
      tag_name = ?
    `, [tagName]
  );
  return tags;
};

export default {
  createTags,
  getTags,
};
