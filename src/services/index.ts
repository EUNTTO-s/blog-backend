import userSvc from "./user.service";
import cateSvc from "./category.service";
import topicSvc from "./topic.service";
import postSvc from "./post.service";
import followSvc from "./follow.service";
import grassSvc from "./grass.service";

const svc_set = {
    userSvc,
    cateSvc,
    topicSvc,
    followSvc,
    postSvc,
    grassSvc,
};

export default svc_set;
