import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {userCtl} = controllers;


const router = express.Router();

// user route
router.post('/user', asyncWrap(userCtl.addUser));
router.get('/user',  asyncWrap(middleware.authMiddleware),  asyncWrap(middleware.adminMiddleware), asyncWrap(userCtl.getAllUser));
// user login route
router.post('/login', asyncWrap(userCtl.login));

export default router;