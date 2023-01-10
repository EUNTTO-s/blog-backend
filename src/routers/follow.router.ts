import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { followCtl } = controllers;

const router = express.Router();

// user route
router.post("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.follow));
router.delete("/follow/:id", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.unfollow));
router.get("/following/user/:id", asyncWrap(followCtl.getFollowings));
router.get("/follower/user/:id", asyncWrap(followCtl.getFollowers));

export default router;
