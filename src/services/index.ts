import cmtSvc from "./comment.service";
import userSvc from "./user.service";
import user_Svc from "./user_.service";
import postSvc from "./post.service";
import memberRequestSvc from "./memberRequest.service";
import companyRequestSvc from "./companyRequest.service";

const svc_set = {
    cmtSvc,
    postSvc,
    userSvc,
    user_Svc,
    memberRequestSvc,
    companyRequestSvc,
};

export default svc_set;
