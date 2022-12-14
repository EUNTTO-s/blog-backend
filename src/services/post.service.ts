import daoset from '../models';

const { postDao, companyDao } = daoset;

const putPostForm = async (postFormInput: CompanyPostFormInput) => {
  let result;
  // 유저 정보 조회
    // TODO 정보 조회
  // 회사 정보 조회
  const companyInfo = await companyDao.getCompanies({id: postFormInput.companiesId});
  if (!companyInfo) {
    throw {status: 404, message: "회사 ID에 해당하는 회사 정보가 존재하지 않습니다."};
  }
  // 카테고리 정보 조회
    // TODO 정보 조회
  // 패스트파이브 입점 정보 조회
    // TODO 정보 조회

    // 이미 작성 폼이 존재하는 지 확인
  const postFormInfo = await postDao.getPostForm({usersId: postFormInput.usersId, companiesId: postFormInput.companiesId});

  // 존재하면 업데이트
  if (postFormInfo) {
    result = await postDao.updatePostForm(postFormInput);
  } else {
    // 그렇지 않으면 생성
    result = await postDao.createPostForm(postFormInput);
  }
  return result;
}

const getPostForm = async (serchOption?: PostFormSearchOption) => {
  return await postDao.getPostForm(serchOption);
}

const updatePost = async (userId: string, postId:string, contents: string, imageUrl: string) => {
  // 유저 정보 조회
    // TODO 정보 조회
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

const deletePost = async (userId: string, postId:string) => {
  // 유저 정보 조회
    // TODO 정보 조회
  // 작성 권한 확인
  const post = await postDao.getPostByPostId(postId);
  if (userId != String(post.userId)) {
    throw {status: 403, message: "작성자만 삭제할 수 있습니다."};
  }
  // 게시글 삭제
  await postDao.deletePost(postId);
}

const getPostByPostId = async (postId: string) => {
  const post = await postDao.getPostByPostId(postId);
  if (!post) {
    throw {status: 404, message: "ID에 해당하는 게시글이 존재하지 않습니다."};
  }
  return post;
}

const getPostsByUserId = async (userId: string) => {
  await postDao.getPostsByUserId(userId);
}

const addLikePost = async (userId: string, postId: string) => {
  await postDao.addLikePost(userId, postId);
}

export default {
  putPostForm,
  getPostForm,

  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
}