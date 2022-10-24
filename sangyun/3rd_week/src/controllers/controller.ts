import express from 'express';
import service from '../services/service'
import {checkDataIsNotEmpty} from '../utils/myutils'

async function login(req: express.Request, res: express.Response) {
  const {email, password} = req.body;
  checkDataIsNotEmpty({email, password});

  const token = await service.login(email, password);
  res.status(200).send({message: 'login Success',token});
}

async function addUser(req: express.Request, res: express.Response) {

  const { email, nickname, password, profile_image = 'none'} = req.body;
  checkDataIsNotEmpty({email, nickname, password});
  const userInfo = {email, nickname, password, profile_image};
  await service.addUser(userInfo);
  res.status(201).json({ message: "successfully created" });
}

async function getAllUser(req: express.Request, res: express.Response) {
  const allUser = await service.getAllUser();
  res.status(200).send(allUser);
}

async function addCommentOnPost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {comment, postId} = req.body;

  // 빈 값이 없는 지 확인
  checkDataIsNotEmpty({comment, postId, userId});
  await service.addCommentOnPost(userId, postId, comment);
  res.status(201).send(`success to add comment`);
}

async function findCommentById(req: express.Request, res: express.Response) {
  const commentId = req.params.id;
  checkDataIsNotEmpty({commentId});
  const comment = await service.findCommentById(commentId);
  res.status(200).send({data: comment});
}

async function updateComment(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId, comment} = req.body;
  checkDataIsNotEmpty({commentId, comment, userId});
  await service.updateComment(commentId, userId, comment);
  res.status(200).send(`success to update comment`);
}

async function deleteComment(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId} = req.body;
  checkDataIsNotEmpty({commentId, userId});
  await service.deleteComment(commentId, userId);
  res.status(200).send(`success to delete comment`);
}

async function addPost(req: express.Request, res: express.Response) {
  const { contents, image_url} = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({contents, image_url, userId});
  await service.addPost(contents, image_url, userId);
  res.status(201).json({ message: "successfully created" });
}

async function getAllPost(req: express.Request, res: express.Response) {
  const posts = await service.getAllPost();
  res.status(201).json({ data: posts });
}

async function updatePost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const { contents, image_url } = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({ postId, contents, image_url, userId });
  const answer = await service.updatePost(userId, postId, contents, image_url);
  res.status(200).json({data: answer});
}

async function deletePost(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({postId, userId});
  await service.deletePost(userId, postId);
  res.status(200).json({ message: "successfully deleted" });
}

async function getPostByPostId(req: express.Request, res: express.Response) {
  const postId = req.params.id;
  checkDataIsNotEmpty({postId});
  const post = await service.getPostByPostId(postId);
  res.status(200).json({data: post});
}

async function getPostsByUserId(req: express.Request, res: express.Response) {
  const userId = req.params.id;
  const posts = await service.getPostsByUserId(userId);
  res.status(200).json({ data: posts });
}

async function addLikePost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const postId = req.params.id;
  await service.addLikePost(userId, postId);
  res.send(`success to add like`);
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
  addCommentOnPost,
  findCommentById,
  updateComment,
  deleteComment,
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
}