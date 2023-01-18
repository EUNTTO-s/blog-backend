import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";

const getTopics = async (searchOption: TopicSearchOption) => {
    const { topicId, topicName } = searchOption;
    const topics = await dataSource.query(
        `
        SELECT
          id,
          topic_name AS content
        FROM
          topics
        ${whereBuilder("id", ["="], topicId, true)}
        ${whereBuilder("topic_name", ["="], topicName)}
        ORDER BY id
        `
    );
    return topics;
};

export default {
  getTopics
};
