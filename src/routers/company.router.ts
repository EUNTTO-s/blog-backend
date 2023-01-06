import express from "express";
import companyCtl from "../controllers/company.controller";
import { asyncWrap } from "../utils/myutils";
const router = express.Router();

// routing
router.get("/company", asyncWrap(companyCtl.getCompanies));

export default router;
