import express from "express";
import controllers from "../controllers";
import middleware from "../middlewares/middleware";
import { asyncWrap } from "../utils/myutils";

const { companyRequestCtl } = controllers;
const router = express.Router();

router.post("/company-request", asyncWrap(middleware.authMiddleware), asyncWrap(companyRequestCtl.createCompany));
router.get("/company-request", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(companyRequestCtl.getCompanyList));
router.post("/company", asyncWrap(middleware.authMiddleware), asyncWrap(companyRequestCtl.approveCompany));
router.delete("/company-request", asyncWrap(middleware.authMiddleware), asyncWrap(companyRequestCtl.refuseCompany));

export default router;
