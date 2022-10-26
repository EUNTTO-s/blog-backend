import express from 'express';
import service_set from '../services'

const {postSvc} = service_set;

import {checkDataIsNotEmpty} from '../utils/myutils'

async function addPost(req: express.Request, res: express.Response) {
  const { contents, image_url} = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({contents, image_url, userId});
  await postSvc.addPost(contents, image_url, userId);
  res.status(201).json({ message: "successfully created" });
}

async function getAllPost(req: express.Request, res: express.Response) {
  const posts = await postSvc.getAllPost();
  res.status(201).json({ data: posts });
}

async function updatePost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const { contents, image_url } = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({ postId, contents, image_url, userId });
  const answer = await postSvc.updatePost(userId, postId, contents, image_url);
  res.status(200).json({data: answer});
}

async function deletePost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({postId, userId});
  await postSvc.deletePost(userId, postId);
  res.status(200).json({ message: "successfully deleted" });
}

async function getPostByPostId(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  checkDataIsNotEmpty({postId});
  const post = await postSvc.getPostByPostId(postId);
  res.status(200).json({data: post});
}

async function getPostsByUserId(req: express.Request, res: express.Response) {
  const userId = req.params.id;
  const posts = await postSvc.getPostsByUserId(userId);
  res.status(200).json({ data: posts });
}

async function addLikePost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const postId = req.params.id;
  await postSvc.addLikePost(userId, postId);
  res.send(`success to add like`);
}

async function test(...[req, res] : Parameters<express.RequestHandler>) : Promise<any> {
  console.log(`userInfo: ${JSON.stringify(req.userInfo)}`);
  res.send("TEST");
}

export default {
  test,
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
}