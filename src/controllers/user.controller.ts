import express from 'express';
import service_set from '../services'
import axios from 'axios';

const {userSvc} = service_set;

import {checkDataIsNotEmpty} from '../utils/myutils'

async function login(req: express.Request, res: express.Response) {
  const {email, password} = req.body;
  checkDataIsNotEmpty({email, password});

  const token = await userSvc.login(email, password);
  res.status(200).send({message: 'login Success',token});
}

async function addUser(req: express.Request, res: express.Response) {

  const { email, nickname, password, profile_image = 'none'} = req.body;
  checkDataIsNotEmpty({email, nickname, password});
  const userInfo = {email, nickname, password, profile_image};
  await userSvc.addUser(userInfo);
  const token = await userSvc.login(email, password);
  res.status(201).json({ message: "successfully created", token });
}

async function getAllUser(req: express.Request, res: express.Response) {
  const allUser = await userSvc.getAllUser();
  res.status(200).send(allUser);
}

async function oauthLogin(req: express.Request, res: express.Response) {
  const kakao_data = await axios({
    method: 'post',
    url: 'https://kauth.kakao.com/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Accept-Encoding': 'application/json'
    },

    params: {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_ID,
      redirect_uri: process.env.KAKAO_REDICRECT_URI,
      code: req.query.code,
    }
  })
    .then(res => res.data);

  console.log("kakao_data: ", kakao_data);

  const userInfoResult = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakao_data.access_token}`,
    },
  });
  const { data } = userInfoResult;
  console.log("🚀 ~ file: user.controller.ts:59 ~ oauthLogin ~ data", data)
  logoutOAuth(kakao_data.access_token);
  res.redirect('http://localhost:3000');
}

async function oauthLogout(req: express.Request, res: express.Response) {
  console.log("🚀 ~ file: user.controller.ts:67 ~ oauthLogout ~ res", res);
  console.log("🚀 ~ file: user.controller.ts:67 ~ oauthLogout ~ req", req);
  res.redirect('http://localhost:3000');
}

async function oauthRedirect(req: express.Request, res: express.Response) {
  res.redirect(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_ID}&redirect_uri=${process.env.KAKAO_REDICRECT_URI}`);
}

async function oauthLogoutRedirect(req: express.Request, res: express.Response) {
  res.redirect(`https://kauth.kakao.com/oauth/logout?client_id=${process.env.KAKAO_ID}&logout_redirect_uri=${process.env.KAKAO_LOGOUT_REDICRECT_URI}`);
}

async function logoutOAuth(accessToken : string) {
  const result = await axios.get('https://kauth.kakao.com/oauth/logout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("result: ", result);
}

async function test(...[req, res] : Parameters<express.RequestHandler>) : Promise<any> {
  console.log('cookies: ', req.cookies);
  res.cookie('foo', 'bar', {
    httpOnly: true
  });
  res.send("TEST");
}

export default {
  test,
  login,
  addUser,
  getAllUser,
  oauthLogin,
  oauthRedirect,
  oauthLogoutRedirect,
  oauthLogout,
}