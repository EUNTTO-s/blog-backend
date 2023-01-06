import dao_set from "../models";
const { topicDao } = dao_set;

const getTopics = async () => {
    return await topicDao.getTopics();
}

export default {
    getTopics,
}