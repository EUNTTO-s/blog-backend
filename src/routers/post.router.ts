import express from 'express';
import postCtl from '../controllers/post.controller';
import {asyncWrap} from '../utils/myutils';
import middleware from '../middlewares/middleware';

const router = express.Router();

// routing
router.post(
  "/posts",
  asyncWrap(middleware.authMiddleware),
  asyncWrap(postCtl.createPosts),
);

router.get(
  "/posts",
  asyncWrap(postCtl.getPosts),
);

router.get(
  "/posts/:id",
  asyncWrap(postCtl.getPosts),
);

router.delete(
  "/posts/:id",
  asyncWrap(middleware.authMiddleware),
  asyncWrap(postCtl.deletePosts),
);

router.patch(
  "/posts/:id",
  asyncWrap(middleware.authMiddleware),
  asyncWrap(postCtl.updatePosts),
);

export default router;