import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { commentCtl } = controllers;

const router = express.Router();

// user route
router.post("/comments", asyncWrap(middleware.authMiddleware), asyncWrap(commentCtl.createComments));
router.get("/comments/:id", asyncWrap(commentCtl.getComments));
router.put("/comments/:id", asyncWrap(middleware.authMiddleware), asyncWrap(commentCtl.updateComments));
router.delete("/comments/:id", asyncWrap(middleware.authMiddleware), asyncWrap(commentCtl.deleteComments));

export default router;
