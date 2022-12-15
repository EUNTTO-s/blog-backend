import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {postCtl} = controllers;
const router = express.Router();

// posting route
router.post('/file-upload', asyncWrap(postCtl.uploadFile));
router.get('/post-form', asyncWrap(postCtl.getPostForm));
router.get('/post-form/:id', asyncWrap(postCtl.getPostForm));
router.put('/post-form', asyncWrap(middleware.authMiddleware), asyncWrap(middleware.upload.any()), asyncWrap(postCtl.putPostForm));
export default router;