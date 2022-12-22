import express from 'express';
import service_set from "../services";
const { cateSvc } = service_set;

const createCategory = async (req: express.Request, res: express.Response) => {
    const { categoryId, img_url } = req.body;
    await cateSvc.updateCategoryImg(categoryId, img_url);
    res.status(201).json({message : "CREATE_CATEGORY"});
}

const getAllCategories = async (req: express.Request, res: express.Response) => {
    const result = await cateSvc.getAllCategories();
    res.json({data: result});
}

const updateCategory = async (req: express.Request, res: express.Response) => {
    const { categoryId, category_name, description } = req.body;
    await cateSvc.updateCategory(categoryId, category_name, description);
    res.status(201).json({message : "UPDATE_CATEGORY"})
}

const deleteCategory = async (req: express.Request, res: express.Response) => {
    const { categoryId } = req.body;
    await cateSvc.deleteCategory(categoryId);
    res.status(200).json({message : "DELETE_CATEGORY"})
}

const updateCategoryImg = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
    const { categoryId, img_url } = req.body;

    await cateSvc.updateCategoryImg(categoryId, img_url);
    res.status(201).json({message : "UPDATE_CATEGORY_IMG"})
    next();
}

const createLevel_2_Category = async (req: express.Request, res: express.Response) => {
    const { level_1_categories_id, category_name, description } = req.body;
    await cateSvc.createLevel_2_Category(level_1_categories_id, category_name, description);
    res.status(201).json({message : "CREATE_CATEGORY_LEVEL2"})
}

const updateLevel_2_Category = async (req: express.Request, res: express.Response) => {
    const { categoryId ,category_name, description } = req.body;
    await cateSvc.updateLevel_2_Category(categoryId, category_name, description);
    res.status(201).json({message : "UPDATE_CATEGORY_LEVEL2"})
}

const deleteLevel_2_Category = async (req: express.Request, res: express.Response) => {
    const { categoryId } = req.body;
    await cateSvc.deleteLevel_2_Category(categoryId);
    res.status(201).json({message : "DELETE_CATEGORY_LEVEL2"})
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
}