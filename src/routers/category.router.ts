import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';


const {cateCtl} = controllers;
const router = express.Router();

router.post('/category', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(middleware.categoryUpload.any()), asyncWrap(cateCtl.createCategory));

router.get('/category', asyncWrap(cateCtl.getAllCategories));

router.patch('/category', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(cateCtl.updateCategory));

router.delete('/category', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(cateCtl.deleteCategory));

router.patch('/category/img', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(middleware.categoryUpload.any()), asyncWrap(cateCtl.updateCategoryImg));

router.post('/category2', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(cateCtl.createLevel_2_Category));

router.patch('/category2', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(cateCtl.updateLevel_2_Category));

router.delete('/category2', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(cateCtl.deleteLevel_2_Category));

export default router;