import cateDao from "../models/category.dao";

const getCategories = async (option: CategorySerarchOption) => {
    return await cateDao.getCategories(option);
}

const createCategories = async (userId: string, cateName: string) => {
  const [cate] = await cateDao.getCategories({userId, cateName});
  if (cate) {
    throw {status: 400, message: "ALREADY_EXIST_CATEGORY_NAME"};
  }

  return await cateDao.createCategories(userId, cateName);
}

const deleteCategories = async (userId: string, cateId: string) => {
  const [cate] = await cateDao.getCategories({userId, cateId});
  if (!cate) {
    throw {status: 400, message: "NOT_EXIST_MATCHED_CATEGORY"};
  }
  return await cateDao.deleteCategories(cateId);
}

const updateCategories = async (userId: string, cateId: string, cateName: string) => {
  const [cate] = await cateDao.getCategories({userId, cateId});
  if (!cate) {
    throw {status: 400, message: "NOT_EXIST_MATCHED_CATEGORY"};
  }
  return await cateDao.updateCategories(cateId, cateName);
}

export default {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories,
}