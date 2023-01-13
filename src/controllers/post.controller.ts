import express from 'express';
import service_set from "../services";
const { postSvc } = service_set;
import {checkDataIsNotEmpty,} from '../utils/myutils'

const createPosts = async (req: express.Request, res: express.Response) => {
  const { title, categoryId, content, secretType, topicId, tagNames} = req.body;
  checkDataIsNotEmpty({ title, content });
  const input = {
    title,
    userId: req.userInfo.id,
    cateId: categoryId,
    content,
    thumnail: req.file || null,
    secretType: secretType || 0,
    topicId: topicId,
    tagNames: tagNames?.split(','),
  }

  await postSvc.createPosts(input);
  res.status(200).json({message: 'POST_CREATED'});
}

const getPosts = async (req: express.Request, res: express.Response) => {
  const searchOption : PostSearchOption = {
    ...req.query,
    postId: req.params.id,
    pageNumber: req.query.pageNumber && Number(req.query.pageNumber),
    countPerPage: req.query.countPerPage && Number(req.query.countPerPage),
  };
  const posts = await postSvc.getPosts(searchOption);
  res.status(200).json({ data: posts });
}

const deletePosts = async (req: express.Request, res: express.Response) => {
  const { id: postId } = req.params;
  await postSvc.deletePosts(req.userInfo.id, postId);
  res.status(200).json({message: 'POST_DELETED'});
}

const updatePosts = async (req: express.Request, res: express.Response) => {
  const { id: postId } = req.params;
  const { title, categoryId, content, secretType, topicId, tagNames } = req.body;
  const input = {
    postId,
    title,
    userId: req.userInfo.id,
    cateId: categoryId,
    content,
    thumnail: req.file || null,
    secretType: secretType || 0,
    topicId: topicId,
    tagNames: tagNames?.split(','),
  }

  await postSvc.updatePosts(input);
  res.status(200).json({message: 'POST_UPDATED'});
}

export default {
  createPosts,
  getPosts,
  deletePosts,
  updatePosts,
}