import userDao from "./user.dao";
import cateDao from "./category.dao";
import topicDao from "./topic.dao";
import postDao from "./post.dao";
import tagDao from "./tag.dao";
import postTagDao from "./postTag.dao";
import followDao from "./follow.dao";
import grassDao from "./grass.dao";

const dao_set = {
    userDao,
    cateDao,
    topicDao,
    postDao,
    tagDao,
    postTagDao,
    followDao,
    grassDao,
};

export default dao_set;
