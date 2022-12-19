import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { memberRequestCtl } = controllers;

const router = express.Router();

// user route
router.post("/member-request", asyncWrap(middleware.authMiddleware), asyncWrap(memberRequestCtl.createMember));
router.get("/member-request", asyncWrap(middleware.authMiddleware), asyncWrap(memberRequestCtl.getMemberList));
router.post("/member", asyncWrap(middleware.authMiddleware), asyncWrap(memberRequestCtl.approveMember));
router.delete("/member", asyncWrap(middleware.authMiddleware), asyncWrap(memberRequestCtl.refuseMember));

export default router;
