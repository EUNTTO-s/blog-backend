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

export default {
  putPostForm,
  getPostForm,
}