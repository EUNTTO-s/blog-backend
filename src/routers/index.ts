import express from "express";
import middleware from "../middlewares/middleware";

import userRouter from "./user.router";
import topicRouter from "./topic.router";
import categoryRouter from "./category.router";
import postRouter from "./post.router";
import followRouter from "./follow.router";
import grassRouter from "./grass.router";
import commentRouter from "./comment.router";

const router = express.Router();
router.use("", topicRouter);
router.use("", categoryRouter);
router.use("", userRouter);
router.use("", postRouter);
router.use("", followRouter);
router.use("", grassRouter);
router.use("", commentRouter);
router.use(express.static(__dirname + "/../../uploads"));
router.use(middleware.errorHandler);
export default router;
