import daoset from '../models';

const { postDao, companyDao, user_Dao, categoryDao, locationDao, postFormDao } =
  daoset;

const putPost = async (postInput: CompanyPostFormInput) => {
  let result;
  // 회사 정보 조회
  const companyInfo = await companyDao.getCompanies({id: postInput.companiesId});
  if (!companyInfo) {
    throw {status: 404, message: "회사 ID에 해당하는 회사 정보가 존재하지 않습니다."};
  }

  // 해당 회사의 메인 멤버인지 확인
  const companyMemberInfo = await postFormDao.getCompanyMemberByUserId(postInput.usersId);

  if (!companyMemberInfo) {
    throw {status: 404, message: "해당 유저는 멤버 그룹에 존재하지 않아 게시물 수정 권한이 없습니다."};
  }

  if ((!companyMemberInfo.isMainMember) || (companyMemberInfo.companiesId != postInput.companiesId)) {
    throw {status: 403, message: "해당 회사에 대한 메인멤버가 아닙니다."};
  }

  // 유저 정보 조회
  const userInfo = await user_Dao.findUser({userId: Number(postInput.usersId)});
  if (!userInfo) {
    throw {status: 404, message: "유저 ID에 해당하는 유저 정보가 존재하지 않습니다."};
  }
  // 카테고리 정보 조회
  const lv2CateInfo = await categoryDao.findlv2CategoryById(Number(postInput.level2CategoriesId));
  if (!lv2CateInfo) {
    throw {status: 404, message: "카테고리 ID에 해당하는 카테고리 정보가 존재하지 않습니다."};
  }
  // 패스트파이브 입점 정보 조회
  const branchInfo = await locationDao.findBranchById(Number(postInput.fastfiveBranchesId));
  if (!branchInfo) {
    throw {status: 404, message: "브랜치 ID에 해당하는 브랜치 정보가 존재하지 않습니다."};
  }

  // 이미 작성 폼이 존재하는 지 확인
  const postInfo = await postDao.getPost({usersId: postInput.usersId, companiesId: postInput.companiesId});
  // TODO
    // 유저가 입력하려는 회사의 대표멥버인지 확인
    // 미들웨어 부분에서 처리해야되는 건지 고민.

  // 존재하면 업데이트
  if (postInfo) {
    result = await postDao.updatePost(postInput);
  } else {
    // 그렇지 않으면 생성
    result = await postDao.createPost(postInput);
  }
  return result;
}

const getPost = async (serchOption?: PostSearchOption) => {
  return await postDao.getPost(serchOption);
}

const deletePost = async (userId: string ,postId: string) => {
  // TODO
    // 현재는 게시글 작성자가 포스트를 삭제할 수 있도록 구현
    // 추후에는 회사의 메인 멤버만이 삭제할 수 있도록 수정 필요
  const postInfo = await postDao.getPost({id: postId});
  if (!postInfo) {
    throw {status: 404, message: "포스트 ID에 해당하는 포스트가 존재하지 않습니다."};
  }
  if (postInfo.usersId != userId) {
    throw {status: 404, message: "해당 게시글을 삭제할 수 있는 권한이 없습니다."};
  }
  return await postDao.deletePost(postId);
}

export default {
  putPost,
  getPost,
  deletePost,
}