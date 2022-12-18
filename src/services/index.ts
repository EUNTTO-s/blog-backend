import cmtSvc from "./comment.service";
import userSvc from "./user.service";
import user_Svc from "./user_.service";
import cateSvc from "./category.service";
import postFormSvc from "./postForm.service";
import postSvc from "./post.service";

const svc_set = {
    cmtSvc,
    postSvc,
    userSvc,
    user_Svc,
    cateSvc,
    postFormSvc,
};

export default svc_set;
