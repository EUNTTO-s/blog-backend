import express from "express";
import cmtRouter from "./comment.router";
import userRouter from "./user.router";
import postRouter from "./post.router";
import memberRequestRouter from "./memberRequest.router";
import companyRequestRouter from "./companyRequest.router";
import middleware from "../middlewares/middleware";

const router = express.Router();
router.use("", cmtRouter);
router.use("", userRouter);
router.use("", postRouter);
router.use("", memberRequestRouter);
router.use("", companyRequestRouter);
router.use(middleware.errorHandler);

export default router;
