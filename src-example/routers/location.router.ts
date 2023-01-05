import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {locationCtl} = controllers;
const router = express.Router();

router.post("/location", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.createLocation));

router.get("/location", asyncWrap(locationCtl.getAllLocations));

router.patch("/location", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.updateLocation));

router.delete("/location", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.deleteLocation));

router.post("/branch", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.createBranch));

router.get("/branch", asyncWrap(locationCtl.getAllBranches));

router.patch("/branch", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.updateBranch));

router.delete("/branch", asyncWrap(middleware.authMiddleware), asyncWrap(middleware.adminMiddleware), asyncWrap(locationCtl.deleteBranch));

export default router;