import cateDao from "../models/category.dao";

const createCategory = async (userId: number, img_url: string, category_name: string, description: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.createCategory(img_url, category_name, description);
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
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.updateCategoryImg(img_url, categoryId);
}

const createLevel_2_Category = async (userId: number, level_1_categories_id: number, category_name: string, description: string) => {
    console.log(userId);
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await cateDao.createLevel_2_Category(level_1_categories_id, category_name, description);
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

export default {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    updateCategoryImg,
    createLevel_2_Category,
    updateLevel_2_Category,
    deleteLevel_2_Category
}