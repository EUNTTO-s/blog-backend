import express from 'express';
import controllers from '../controllers';
import {asyncWrap} from '../utils/myutils';

const {companyCtl} = controllers;
const router = express.Router();

// posting route
router.get('/company', asyncWrap(companyCtl.getCompanies));

export default router;