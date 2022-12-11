import daoset from '../models';

const {postDao, userDao} = daoset;

async function addPost(contents: string, image_url: string, userId: string) {
  // 유저 정보 조회
  const userInfo = await userDao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  return await postDao.addPost(contents, image_url, userId);
}

async function getAllPost() {
  return await postDao.getAllPost();
}

async function updatePost(userId: string, postId:string, contents: string, imageUrl: string) {
  // 유저 정보 조회
  const userInfo = await userDao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  const post = await postDao.getPostByPostId(postId);
  if (userId != String(post.userId)) {
    throw {status: 403, message: "작성자만 변경할 수 있습니다."};
  }
  // 게시글 변경
  await postDao.updatePost(postId, contents, imageUrl);
  const updatedPost = postDao.getPostByPostId(postId);
  return updatedPost;
}

async function deletePost(userId: string, postId:string) {
  // 유저 정보 조회
  const userInfo = await userDao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  const post = await postDao.getPostByPostId(postId);
  if (userId != String(post.userId)) {
    throw {status: 403, message: "작성자만 삭제할 수 있습니다."};
  }
  // 게시글 삭제
  await postDao.deletePost(postId);
}

async function getPostByPostId(postId: string) {
  const post = await postDao.getPostByPostId(postId);
  if (!post) {
    throw {status: 404, message: "ID에 해당하는 게시글이 존재하지 않습니다."};
  }
  return post;
}

async function getPostsByUserId(userId: string) {
  await postDao.getPostsByUserId(userId);
}

async function addLikePost(userId: string, postId: string) {
  await postDao.addLikePost(userId, postId);
}

export default {
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
}