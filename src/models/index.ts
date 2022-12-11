import userDao from './user.dao';
import postDao from './post.dao';
import cmtDao from './comment.dao';

const dao_set = {
  userDao,
  postDao,
  cmtDao,
}

export default dao_set;