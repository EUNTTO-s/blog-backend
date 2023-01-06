import express from "express";
import middleware from "../middlewares/middleware";

import userRouter from "./user.router";
import topicRouter from './topic.router';
import categoryRouter from './category.router';

const router = express.Router();
router.use('', topicRouter);
router.use('', categoryRouter);
router.use("", userRouter);

router.use(express.static(__dirname + "/../../uploads"));
router.use(middleware.errorHandler);
export default router;
