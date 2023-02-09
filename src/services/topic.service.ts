import dao_set from "../models";
const { topicDao } = dao_set;

const getTopics = async (searchOption: TopicSearchOption) => {
    return await topicDao.getTopics(searchOption);
}

export default {
    getTopics,
}