import express from 'express';
import service_set from '../services'
const {postSvc} = service_set;
import {checkDataIsNotEmpty, createFolder} from '../utils/myutils'
import middleware from '../middlewares/middleware'

createFolder('uploads');

const getPostForm = async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const posts = await postSvc.getPostForm({id});
  res.status(201).json({ data: posts });
}

const putPostForm = async (req: express.Request, res: express.Response) => {
  res.locals.fileupload = {};
  res.locals.fileupload.fileUploadWasRequested = false;
  console.log("fileupload: ", req.res.locals.fileupload);
  const {
    companiesId,
    companyName,
    companyContactAddress,
    companyImgUrl,
    companyInfoUrl,
    companyLongDesc,
    companyShortDesc,
    fastfiveBenefitDesc,
    fastfiveBranchesId,
    homepageUrl,
    level2CategoriesId,
    mainBussinessTags,
  } = req.body;

  const postForm = {
    companiesId,
    companyName,
    companyContactAddress,
    companyImgUrl,
    companyInfoUrl,
    companyLongDesc,
    companyShortDesc,
    fastfiveBenefitDesc,
    fastfiveBranchesId,
    homepageUrl,
    level2CategoriesId,
    mainBussinessTags,
    usersId: req.userInfo.id
  };

  const esentialItems = {
    companiesId,
    usersId: postForm.usersId,
  }

  checkDataIsNotEmpty(esentialItems);
  const posts = await postSvc.putPostForm(postForm);
  res.status(201).json({ data: posts });
}

const addPost = async (req: express.Request, res: express.Response) => {
  const { companiesId, usersId }: CompanyPostFormInput = req.body;
  // const userId = req.userInfo.id;
  checkDataIsNotEmpty({companiesId, usersId});
  // await postSvc.addPost(contents, image_url, userId);
  res.status(201).json({ message: "successfully created" });
}

const updatePost = async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  const { contents, image_url } = req.body;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({ postId, contents, image_url, userId });
  const answer = await postSvc.updatePost(userId, postId, contents, image_url);
  res.status(200).json({data: answer});
}

const deletePost = async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  const userId = req.userInfo.id;
  checkDataIsNotEmpty({postId, userId});
  await postSvc.deletePost(userId, postId);
  res.status(200).json({ message: "successfully deleted" });
}

const getPost = async (req: express.Request, res: express.Response) => {
  res.send(`getPost`);
}

const getPostByPostId = async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  checkDataIsNotEmpty({postId});
  const post = await postSvc.getPostByPostId(postId);
  res.status(200).json({data: post});
}

const getPostsByUserId = async (req: express.Request, res: express.Response) => {
  const userId = req.params.id;
  const posts = await postSvc.getPostsByUserId(userId);
  res.status(200).json({ data: posts });
}

const addLikePost = async (req: express.Request, res: express.Response) => {
  const userId = req.userInfo.id;
  const postId = req.params.id;
  await postSvc.addLikePost(userId, postId);
  res.send(`success to add like`);
}

const uploadFile = async (req: express.Request, res: express.Response) => {
  res.locals.fileupload = {};
  res.locals.fileupload.fileUploadWasRequested = false;
  middleware.upload.any()(req, null, () => {
    res.send(`success to add`);
  });
}

const test = async (...[req, res] : Parameters<express.RequestHandler>) : Promise<any> => {
  console.log(`userInfo: ${JSON.stringify(req.userInfo)}`);
  res.send("TEST");
}

export default {
  putPostForm,
  getPostForm,
  addPost,
  getPost,
  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
  uploadFile,
  test,
}