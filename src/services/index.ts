import cmtSvc from "./comment.service";
import userSvc from "./user.service";
import user_Svc from "./user_.service";
import cateSvc from "./category.service";
import postFormSvc from "./postForm.service";
import postSvc from "./post.service";
import companySvc from "./company.service";
import memberRequestSvc from "./memberRequest.service";
import companyRequestSvc from "./companyRequest.service";

const svc_set = {
    cmtSvc,
    postSvc,
    userSvc,
    user_Svc,
    memberRequestSvc,
    companyRequestSvc,
    cateSvc,
    postFormSvc,
    companySvc,
};

export default svc_set;
