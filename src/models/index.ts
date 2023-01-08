import userDao from "./user.dao";
import cateDao from "./category.dao";
import topicDao from "./topic.dao";
import followDao from "./follow.dao";

const dao_set = {
    userDao,
    cateDao,
    topicDao,
    followDao,
};

export default dao_set;
