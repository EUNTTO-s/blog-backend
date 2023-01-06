import dataSource from "./database";

const getTopics = async () => {
    const topics = await dataSource.query(
        `
        SELECT
          id,
          topic_name
        FROM
          topics
        `
    );
    return topics;
};

export default {
  getTopics
};
