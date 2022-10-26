import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {cmtCtl} = controllers;
const router = express.Router();

// comments route
  // create comment
router.post('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.addCommentOnPost));
  // read comment
router.get('/post/comment/:id', asyncWrap(cmtCtl.findCommentById));
  // update comment
router.patch('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.updateComment));
  // delete comment
router.delete('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(cmtCtl.deleteComment));

// test
router.get('/test', asyncWrap(middleware.authMiddleware), asyncWrap((req, res) => {
  res.send("Test");
}));

export default router;