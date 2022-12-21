import cateDao from "../models/category.dao";

const createCategory = async (userId: number, img_url: string, category_name: string, description: string) => {
    await cateDao.createCategory(img_url, category_name, description);
    const lv1_len = await cateDao.getCateLv1Length();
    await cateDao.createLevel_2_Category(lv1_len.max, '일반');

}

const getAllCategories = async () => {
    const result = await cateDao.getAllCategories();
    return result;
}

const updateCategory = async (userId: number, categoryId: number, category_name?: string, description?: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.updateCategory(categoryId, category_name, description);
}

const deleteCategory = async (userId: number, categoryId: number) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.deleteCategory(categoryId);
}

const updateCategoryImg = async (userId: number, categoryId: number, img_url: string) => {
    await cateDao.updateCategoryImg(img_url, categoryId);
}

const createLevel_2_Category = async (userId: number, level_1_categories_id: number, category_name: string, description: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.createLevel_2_Category(level_1_categories_id, category_name);
}

const updateLevel_2_Category = async (userId: number, categoryId: number, category_name?: string, description?: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.updateLevel_2_Category(categoryId, category_name, description);
}

const deleteLevel_2_Category = async (userId: number, categoryId: number) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.deleteLevel_2_Category(categoryId);
}

const getCategory_1_byCateId = async (categoryId: string) => {
  return await cateDao.findCategoryById(Number(categoryId));
}

const getCategory_1_byCateName = async (categoryName: string) => {
  return await cateDao.findCategoryByCateName(categoryName);
}

export default {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    updateCategoryImg,
    createLevel_2_Category,
    updateLevel_2_Category,
    deleteLevel_2_Category,
    getCategory_1_byCateId,
    getCategory_1_byCateName,
}