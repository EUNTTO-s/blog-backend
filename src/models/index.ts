import userDao from "./user.dao";
import user_Dao from "./user_.dao";
import postDao from "./post.dao";
import cmtDao from "./comment.dao";

const dao_set = {
    userDao,
    user_Dao,
    postDao,
    cmtDao,
};

export default dao_set;
