import cateDao from "../models/category.dao";

const createCategory = async (imgUrl: string, categoryName: string, description: string) => {
    await cateDao.createCategory(imgUrl, categoryName, description);
    const lv1_len = await cateDao.getCateLv1Length();
    await cateDao.createLevel_2_Category(lv1_len.max, '일반');

}

const getAllCategories = async () => {
    const result = await cateDao.getAllCategories();
    return result;
}

const updateCategory = async (categoryId: number, categoryName?: string, description?: string) => {
    await cateDao.updateCategory(categoryId, categoryName, description);
}

const deleteCategory = async (categoryId: number) => {
    await cateDao.deleteCategory(categoryId);
}

const updateCategoryImg = async (categoryId: number, imgUrl: string) => {
    await cateDao.updateCategoryImg(imgUrl, categoryId);
}

const createLevel_2_Category = async (level_1_categories_id: number, categoryName: string, description: string) => {
    await cateDao.createLevel_2_Category(level_1_categories_id, categoryName);
}

const updateLevel_2_Category = async (categoryId: number, categoryName?: string, description?: string) => {
    await cateDao.updateLevel_2_Category(categoryId, categoryName, description);
}

const deleteLevel_2_Category = async (categoryId: number) => {
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