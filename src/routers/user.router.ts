import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import fileManager from "../middlewares/fileManager";
import { asyncWrap } from "../utils/myutils";

const { userCtl } = controllers;

const router = express.Router();

// user route
router.post("/signup", asyncWrap(userCtl.signUp));
router.post(
  ["/nickname", "/nickname/check"],
  asyncWrap(userCtl.isExistNickname)
);
router.post(["/email", "/email/check"], asyncWrap(userCtl.isExistEmail));
router.post("/login", asyncWrap(userCtl.login));
router.get(["/users", "/users/:id"], asyncWrap(middleware.authInfoMiddleware), asyncWrap(userCtl.getUserInfo));
router.patch("/profile", asyncWrap(middleware.authMiddleware), asyncWrap(fileManager.upload.single("profileImg")), asyncWrap(userCtl.updateProfile));
export default router;
