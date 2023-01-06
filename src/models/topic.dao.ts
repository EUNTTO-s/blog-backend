import dataSource from "./database";

const getTopics = async () => {
    const topics = await dataSource.query(
        `
        SELECT
          id,
          topic_name AS content
        FROM
          topics
          ORDER BY id
        `
    );
    return topics;
};

export default {
  getTopics
};
