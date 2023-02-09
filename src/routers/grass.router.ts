import express from 'express';
import controllers from "../controllers";
import {asyncWrap} from '../utils/myutils';
const { grassCtl } = controllers;
const router = express.Router();

// routing
router.get('/grasses', asyncWrap(grassCtl.getGrasses));

export default router;