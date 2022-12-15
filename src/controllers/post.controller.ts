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
  uploadFile,
  test,
}