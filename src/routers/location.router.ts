import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {locationCtl} = controllers;
const router = express.Router();

router.post("/location/createLocation", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.createLocation));

router.get("/location", asyncWrap(locationCtl.getAllLocations));

router.patch("/location/updateLocation", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.updateLocation));

router.delete("/location/deleteLocation", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.deleteLocation));

router.post("/branch/createBranch", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.createBranch));

router.get("/branch", asyncWrap(locationCtl.getAllBranches));

router.patch("/branch/updateBranch", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.updateBranch));

router.delete("/branch/deleteBranch", asyncWrap(middleware.authMiddleware), asyncWrap(locationCtl.deleteBranch));


export default router;