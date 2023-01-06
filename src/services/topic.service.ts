import topicDao from "../models/topic.dao";

const getTopics = async () => {
    return await topicDao.getTopics();
}

export default {
    getTopics,
}