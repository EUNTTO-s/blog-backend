import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {cmtCtl} = controllers;
const router = express.Router();

router.post('/post/addCommentOnPost', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.addCommentOnPost));

router.post('/post/addCommentOnComment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.addCommentOnComment));

router.get('/post/:id/:page', asyncWrap(cmtCtl.getCommentOnPost));

router.patch('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.updateComment));

router.delete('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.deleteComment));

export default router;