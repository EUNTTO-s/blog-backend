import express from 'express';
import service_set from '../services'

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
async function test(...[req, res] : Parameters<express.RequestHandler>) : Promise<any> {
  console.log(`userInfo: ${JSON.stringify(req.userInfo)}`);
  res.send("TEST");
}

export default {
  test,
  login,
  addUser,
  getAllUser,
}