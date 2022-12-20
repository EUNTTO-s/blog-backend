import express from 'express';
import service_set from '../services'
import {checkDataIsNotEmpty} from '../utils/myutils'

const {cmtSvc} = service_set;

const addCommentOnPost = async (req: express.Request, res: express.Response) => {
  const userId = req.userInfo.id;
  const {comment, postId, is_secret}: CommentInputType = req.body;
  checkDataIsNotEmpty({userId, comment, postId});
  await cmtSvc.addCommentOnPost(Number(userId), postId, comment, is_secret);
  res.json({message : "COMMENT_CREATED"});
}

const addCommentOnComment = async (req: express.Request, res: express.Response) => {
  const userId = req.userInfo.id;
  const {comment, postId, commentId ,is_secret}: CommentInputType = req.body;
  console.log(is_secret);
  checkDataIsNotEmpty({userId, comment, postId, commentId})
  await cmtSvc.addCommentOnComment(Number(userId), postId, commentId, comment, is_secret);
  res.json({message : "COMMENT_CREATED"});
}

const getCommentOnPost = async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  const { page } = req.query;
  const token = req.headers.authorization;
  const result = token === undefined ? await cmtSvc.getCommentOnPost(Number(postId), Number(page)): await cmtSvc.getCommentOnPost(Number(postId), Number(page), token);
  const length = await cmtSvc.getLengthOnPost(Number(postId));
  res.json({length: length, data: result});
}

const updateComment = async (req: express.Request, res: express.Response) => {
  const userId = req.userInfo.id;
  const {comment, commentId, is_secret}: CommentInputType = req.body;
  await cmtSvc.updateComment(Number(userId), commentId, comment, is_secret);
  res.json({message : "COMMENT_UPDATED"});
}

const deleteComment = async (req: express.Request, res:express.Response) => {
  const userId = req.userInfo.id;
  const {commentId}: CommentInputType = req.body;
  checkDataIsNotEmpty({userId, commentId});
  await cmtSvc.deleteComment(Number(userId), commentId);
  res.json({message : "COMMENT_DELETED"})
}

export default {
  addCommentOnPost,
  addCommentOnComment,
  getCommentOnPost,
  updateComment,
  deleteComment
}