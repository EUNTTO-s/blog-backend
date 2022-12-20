import express from 'express';
import service_set from '../services'
const {postFormSvc} = service_set;
import {checkDataIsNotEmpty, createFolder} from '../utils/myutils'
import middleware from '../middlewares/middleware'

createFolder('uploads');

const getPostForm = async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const usersId = req.userInfo.id;
  const posts = await postFormSvc.getPostForm({id, usersId});
  res.status(200).json(posts);
}

const putPostForm = async (req: express.Request, res: express.Response) => {
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
  await postFormSvc.putPostForm(postForm);
  res.status(200).json({ message: "PUT_SUCCESS" });
}

const uploadFile = async (req: express.Request, res: express.Response) => {
  middleware.upload.any()(req, null, () => {
    res.send(`ADD_SUCCESS`);
  });
}

const test = async (...[req, res] : Parameters<express.RequestHandler>) : Promise<any> => {
  console.log(`userInfo: ${JSON.stringify(req.userInfo)}`);
  res.send("TEST");
}

export default {
  putPostForm,
  getPostForm,
  uploadFile,
  test,
}