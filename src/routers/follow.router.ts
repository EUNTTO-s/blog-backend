import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { followCtl } = controllers;

const router = express.Router();

// user route
router.post("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.followRequest));
router.delete("/follow/:id", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.unfollowRequest));
router.get("/following", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.getFollowingList));
router.get("/follower", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.getFollowerList));

export default router;
