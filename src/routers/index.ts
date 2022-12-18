import express from "express";
import cmtRouter from "./comment.router";
import userRouter from "./user.router";
import cateRouter from "./category.router";
import locationRouter from "./location.router";
import postFormRouter from './postForm.router';
import postRouter from './post.router';
import middleware from "../middlewares/middleware";

const router = express.Router();
router.use("", cmtRouter);
router.use("", userRouter);
router.use("", cateRouter);
router.use("", locationRouter);
router.use('', postFormRouter);
router.use('', postRouter);
router.use(express.static(__dirname + '/../../uploads'));
router.use(middleware.errorHandler);

export default router;