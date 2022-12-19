import userDao from "./user.dao";
import user_Dao from "./user_.dao";
import postDao from "./postForm.dao";
import cmtDao from "./comment.dao";
import categoryDao from "./category.dao";
import locationDao from "./location.dao";
import companyDao from './company.dao';

const dao_set = {
    userDao,
    user_Dao,
    postDao,
    cmtDao,
    categoryDao,
    locationDao,
    companyDao,
};

export default dao_set;
