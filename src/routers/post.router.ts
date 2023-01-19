import express from 'express';
import postCtl from '../controllers/post.controller';
import {asyncWrap} from '../utils/myutils';
import middleware from '../middlewares/middleware';
import fileManager from '../middlewares/fileManager';

const router = express.Router();

// routing
router.post(
  "/posts",
  asyncWrap(middleware.authMiddleware),
  asyncWrap(fileManager.upload.single('thumbnail')),
  asyncWrap(postCtl.createPosts),
);

router.get(
  ["/posts", "/posts/:id"],
  asyncWrap(middleware.authInfoMiddleware),
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
  asyncWrap(fileManager.upload.single('thumbnail')),
  asyncWrap(postCtl.updatePosts),
);

export default router;