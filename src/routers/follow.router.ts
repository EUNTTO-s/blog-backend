import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { followCtl } = controllers;

const router = express.Router();

// user route
router.post("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.folllowRequest));
router.delete("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.unfolllowRequest));
router.get("/follow", asyncWrap(middleware.authMiddleware), asyncWrap(followCtl.findFollowList));

export default router;
