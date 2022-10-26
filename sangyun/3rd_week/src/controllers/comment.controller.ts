import express from 'express';
import service_set from '../services'
import {checkDataIsNotEmpty} from '../utils/myutils'

const {cmtSvc} = service_set;

async function addCommentOnPost(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {comment, postId} = req.body;

  // 빈 값이 없는 지 확인
  checkDataIsNotEmpty({comment, postId, userId});
  await cmtSvc.addCommentOnPost(userId, postId, comment);
  res.status(201).send(`success to add comment`);
}

async function findCommentById(req: express.Request, res: express.Response) {
  const commentId = req.params.id;
  checkDataIsNotEmpty({commentId});
  const comment = await cmtSvc.findCommentById(commentId);
  res.status(200).send({data: comment});
}

async function updateComment(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId, comment} = req.body;
  checkDataIsNotEmpty({commentId, comment, userId});
  await cmtSvc.updateComment(commentId, userId, comment);
  res.status(200).send(`success to update comment`);
}

async function deleteComment(req: express.Request, res: express.Response) {
  const userId = req.userInfo.id;
  const {commentId} = req.body;
  checkDataIsNotEmpty({commentId, userId});
  await cmtSvc.deleteComment(commentId, userId);
  res.status(200).send(`success to delete comment`);
}

export default {
  addCommentOnPost,
  findCommentById,
  updateComment,
  deleteComment,
}