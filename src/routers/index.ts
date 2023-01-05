import express from "express";
import companyRouter from './company.router';
import middleware from "../middlewares/middleware";

const router = express.Router();
router.use('', companyRouter);


router.use(express.static(__dirname + '/../../uploads'));
router.use(middleware.errorHandler);
export default router;