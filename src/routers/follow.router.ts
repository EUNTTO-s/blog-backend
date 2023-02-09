import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { followCtl } = controllers;

const router = express.Router();

// user route
router.post("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.follow));
router.delete("/follow/:id", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.unfollow));
router.get(
  ["/following", "/following/user/:id"],
  asyncWrap(middleware.authInfoMiddleware),
  asyncWrap(followCtl.getFollowings)
);

router.get(
  ["/follower", "/follower/user/:id"],
  asyncWrap(middleware.authInfoMiddleware),
  asyncWrap(followCtl.getFollowers));

export default router;
