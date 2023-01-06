import express from 'express';
import cateCtl from '../controllers/category.controller';
import {asyncWrap} from '../utils/myutils';
import middleware from '../middlewares/middleware';

const router = express.Router();

// routing
router.post("/categories",
            asyncWrap(middleware.authMiddleware),
            asyncWrap(cateCtl.createCategories));

router.get("/categories/users/:id",
            asyncWrap(cateCtl.getCategories));

router.patch("/categories",
            asyncWrap(middleware.authMiddleware),
            asyncWrap(cateCtl.updateCategories));

router.delete("/categories",
            asyncWrap(middleware.authMiddleware),
            asyncWrap(cateCtl.deleteCategories));

export default router;