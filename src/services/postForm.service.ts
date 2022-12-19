import daoset from '../models';

const { postDao, companyDao, user_Dao, categoryDao, locationDao } = daoset;

const putPostForm = async (postFormInput: CompanyPostFormInput) => {
  let result;
  // 회사 정보 조회
  const companyInfo = await companyDao.getCompanies({id: postFormInput.companiesId});
  if (!companyInfo) {
    throw {status: 404, message: "회사 ID에 해당하는 회사 정보가 존재하지 않습니다."};
  }
  // 유저 정보 조회
  const userInfo = await user_Dao.findUser({userId: Number(postFormInput.usersId)});
  console.log("userInfo: ", userInfo);
  if (!userInfo) {
    throw {status: 404, message: "유저 ID에 해당하는 유저 정보가 존재하지 않습니다."};
  }
  // 카테고리 정보 조회
  const lv2CateInfo = await categoryDao.findlv2CategoryById(Number(postFormInput.level2CategoriesId));
  if (!lv2CateInfo) {
    throw {status: 404, message: "카테고리 ID에 해당하는 카테고리 정보가 존재하지 않습니다."};
  }
  // 패스트파이브 입점 정보 조회
  const branchInfo = await locationDao.findBranchById(Number(postFormInput.fastfiveBranchesId));
  if (!branchInfo) {
    throw {status: 404, message: "브랜치 ID에 해당하는 브랜치 정보가 존재하지 않습니다."};
  }

  // 이미 작성 폼이 존재하는 지 확인
  const postFormInfo = await postDao.getPostForm({usersId: postFormInput.usersId, companiesId: postFormInput.companiesId});

  // 유저가 입력하려는 회사의 대표멥버인지 확인
    // TODO
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
  // 이미 작성 폼이 존재하는 지 확인
  const postFormInfo = await postDao.getPostForm({usersId: serchOption.usersId, companiesId: serchOption.companiesId});

  if (serchOption.usersId !== postFormInfo.usersId) {
    throw {status: 404, message: "자신이 작성한 게시글만 볼 수 있습니다."};
  }

  return await postDao.getPostForm(serchOption);
}

export default {
  putPostForm,
  getPostForm,
}