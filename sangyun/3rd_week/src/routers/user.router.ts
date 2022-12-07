import express from 'express';
import controllers from '../controllers';
import middleware from '../middlewares/middleware';
import {asyncWrap} from '../utils/myutils';

const {userCtl} = controllers;


const router = express.Router();

router.use((req, res, next) => {
  console.log("req.body:", req.body);
  next();
})

// user route
router.post('/user', asyncWrap(userCtl.addUser));
router.get('/user',  asyncWrap(middleware.authMiddleware),  asyncWrap(middleware.adminMiddleware), asyncWrap(userCtl.getAllUser));
// user login route
router.post('/login', asyncWrap(userCtl.login));
router.get('/oauth/kakao', asyncWrap(userCtl.oauthLogin));
router.get('/oauth/kakao/redirect', asyncWrap(userCtl.oauthRedirect));
router.get('/oauth/kakao/logout', asyncWrap(userCtl.oauthLogout));
router.get('/oauth/kakao/logout/redirect', asyncWrap(userCtl.oauthLogoutRedirect));
router.get('/test', asyncWrap(userCtl.test));

export default router;