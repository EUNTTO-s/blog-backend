import daoset from '../models';

const { postFormDao, companyDao, user_Dao, categoryDao, locationDao } = daoset;

const putPostForm = async (postFormInput: CompanyPostFormInput) => {
  let result;
  // 회사 정보 조회
  const companyInfo = await companyDao.getCompanies({id: postFormInput.companiesId});
  if (!companyInfo) {
    throw {status: 404, message: "회사 ID에 해당하는 회사 정보가 존재하지 않습니다."};
  }

  // 해당 회사의 메인 멤버인지 확인
  const companyMemberInfo = await postFormDao.getCompanyMemberByUserId(postFormInput.usersId);

  if (!companyMemberInfo) {
    throw {status: 404, message: "해당 유저는 멤버 그룹에 존재하지 않아 임시 게시물 수정 권한이 없습니다."};
  }

  if ((!companyMemberInfo.isMainMember) || (companyMemberInfo.companiesId != postFormInput.companiesId)) {
    throw {status: 403, message: "해당 회사에 대한 메인멤버가 아닙니다."};
  }

  // 유저 정보 조회
  const userInfo = await user_Dao.findUser({userId: Number(postFormInput.usersId)});
  console.log("userInfo: ", userInfo);
  if (!userInfo) {
    throw {status: 404, message: "유저 ID에 해당하는 유저 정보가 존재하지 않습니다."};
  }

  if (postFormInput.level2CategoriesId) {
    // 카테고리 정보 조회
    const lv2CateInfo = await categoryDao.findlv2CategoryById(Number(postFormInput.level2CategoriesId));
    if (!lv2CateInfo) {
      throw {status: 404, message: "카테고리 ID에 해당하는 카테고리 정보가 존재하지 않습니다."};
    }
  }

  if (postFormInput.fastfiveBranchesId) {
    // 패스트파이브 입점 정보 조회
    const branchInfo = await locationDao.findBranchById(Number(postFormInput.fastfiveBranchesId));
    if (!branchInfo) {
      throw {status: 404, message: "브랜치 ID에 해당하는 브랜치 정보가 존재하지 않습니다."};
    }
  }

  // 이미 작성 폼이 존재하는 지 확인
  const postFormInfo = await postFormDao.getPostForm({usersId: postFormInput.usersId, companiesId: postFormInput.companiesId});

  // 유저가 입력하려는 회사의 대표멥버인지 확인
    // TODO
  // 존재하면 업데이트
  if (postFormInfo) {
    result = await postFormDao.updatePostForm(postFormInput);
  } else {
    // 그렇지 않으면 생성
    result = await postFormDao.createPostForm(postFormInput);
  }
  return result;
}

const getPostForm = async (serchOption?: PostFormSearchOption) => {
  // 이미 작성 폼이 존재하는 지 확인
  const postFormInfo = await postFormDao.getPostForm({usersId: serchOption.usersId, companiesId: serchOption.companiesId});

  if (!postFormInfo) {
    const companyMemberInfo = await postFormDao.getCompanyMemberByUserId(serchOption.usersId);
    if (!companyMemberInfo) {
      throw {status: 404, message: "해당 유저는 멤버 그룹에 존재하지 않아 임시 게시물 수정 권한이 없습니다."};
    }
    // 아무 정보도 없을 시 default value 전달
    return {
      "companyName": "",
      "companyImgUrl": "",
      "companyShortDesc": "",
      "homepageUrl": "",
      "mainBussinessTags": "",
      "companyLongDesc": "",
      "fastfiveBenefitDesc": "",
      "companyContactAddress": "",
      "companyInfoUrl": "",
      "company": companyMemberInfo.company,
    };
  }
  // TODO
    // 메인 멤버만 작성할 수 있도록 수정 필요
  // if (serchOption.usersId !== postFormInfo.usersId) {
  //   throw {status: 404, message: "자신이 작성한 게시글만 볼 수 있습니다."};
  // }

  return await postFormDao.getPostForm(serchOption);
}

export default {
  putPostForm,
  getPostForm,
}