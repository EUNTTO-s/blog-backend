import express from 'express';
import controller from '../controllers/controller';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const router = express.Router();

// user route
router.post('/user', asyncWrap(controller.addUser));
router.get('/user',  asyncWrap(middleware.authMiddleware),  asyncWrap(middleware.adminMiddleware), asyncWrap(controller.getAllUser));
// user login route
router.post('/login', asyncWrap(controller.login));

// TODO 대댓글 추가해보기
// comments route
  // create comment
router.post('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(controller.addCommentOnPost));
  // read comment
router.get('/post/comment/:id', asyncWrap(controller.findCommentById));
  // update comment
router.patch('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(controller.updateComment));
  // delete comment
router.delete('/post/comment', asyncWrap(middleware.authMiddleware), asyncWrap(controller.deleteComment));

// posting route
router.post('/post', asyncWrap(middleware.authMiddleware), asyncWrap(controller.addPost));
router.get('/post', asyncWrap(controller.getAllPost));
router.patch('/post/:id', asyncWrap(middleware.authMiddleware), asyncWrap(controller.updatePost));
router.delete('/post/:id', asyncWrap(middleware.authMiddleware), asyncWrap(controller.deletePost));
router.get('/post/:id', asyncWrap(controller.getPostByPostId));
router.get('/post/user/:id', asyncWrap(controller.getPostsByUserId));

// likes route
router.post('/post/:id/like', asyncWrap(middleware.authMiddleware), asyncWrap(controller.addLikePost));

// test
router.get('/test', asyncWrap(middleware.authMiddleware), asyncWrap(controller.test));

router.use(middleware.errorHandler);

export default router;