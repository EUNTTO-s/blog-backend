import userDao from "./user.dao";
import user_Dao from "./user_.dao";
import postDao from "./post.dao";
import cmtDao from "./comment.dao";
import categoryDao from "./category.dao";
import locationDao from "./location.dao";

const dao_set = {
    userDao,
    user_Dao,
    postDao,
    cmtDao,
    categoryDao,
    locationDao,
};

export default dao_set;
