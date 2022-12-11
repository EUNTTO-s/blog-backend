import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {postCtl} = controllers;
const router = express.Router();

// posting route
router.post('/post', asyncWrap(middleware.authMiddleware), asyncWrap(postCtl.addPost));
router.get('/post', asyncWrap(postCtl.getAllPost));
router.patch('/post/:id', asyncWrap(middleware.authMiddleware), asyncWrap(postCtl.updatePost));
router.delete('/post/:id', asyncWrap(middleware.authMiddleware), asyncWrap(postCtl.deletePost));
router.get('/post/:id', asyncWrap(postCtl.getPostByPostId));
router.get('/post/user/:id', asyncWrap(postCtl.getPostsByUserId));
router.post('/post/:id/like', asyncWrap(middleware.authMiddleware), asyncWrap(postCtl.addLikePost));
router.post('/file-upload', asyncWrap(postCtl.uploadFile));
export default router;