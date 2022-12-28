import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {cmtCtl} = controllers;
const router = express.Router();

router.post('/commentOnPost', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.addCommentOnPost));

router.post('/commentOnComment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.addCommentOnComment));

router.get('/comment/:id', asyncWrap(cmtCtl.getCommentOnPost));

router.patch('/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.updateComment));

router.delete('/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.deleteComment));

export default router;