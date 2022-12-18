import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {postFormCtl} = controllers;
const router = express.Router();

// posting route
router.post('/file-upload', asyncWrap(postFormCtl.uploadFile));
router.get('/post-form', asyncWrap(middleware.authMiddleware), asyncWrap(postFormCtl.getPostForm));
router.get('/post-form/:id', asyncWrap(middleware.authMiddleware), asyncWrap(postFormCtl.getPostForm));
router.put('/post-form', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.upload.any()), middleware.removeFolderOnEmptyProperty, asyncWrap(postFormCtl.putPostForm));

export default router;