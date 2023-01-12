import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { userCtl } = controllers;

const router = express.Router();

// user route
router.post("/signup", asyncWrap(userCtl.signUp));
router.post("/nickname", asyncWrap(userCtl.isExistNickname));
router.post("/email", asyncWrap(userCtl.isExistEmail));
router.post("/login", asyncWrap(userCtl.login));
router.get("/user", asyncWrap(middleware.authMiddleware), asyncWrap(userCtl.getMe));
router.patch("/profile", asyncWrap(middleware.authMiddleware), asyncWrap(userCtl.updateProfile));
export default router;
