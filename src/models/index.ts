import userDao from "./user.dao";
import user_Dao from "./user_.dao";
import postDao from "./post.dao";
import cmtDao from "./comment.dao";
import categoryDao from "./category.dao";
import locationDao from "./location.dao";
import companyDao from "./company.dao";
import memberRequestDao from "./memberRequest.dao";
import companyRequestDao from "./companyRequest.dao";

const dao_set = {
    userDao,
    user_Dao,
    postDao,
    cmtDao,
    categoryDao,
    locationDao,
    companyDao,
    memberRequestDao,
    companyRequestDao,
};

export default dao_set;
