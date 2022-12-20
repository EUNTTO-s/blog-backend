import express from 'express';
import service_set from '../services'
const {postSvc} = service_set;
import {checkDataIsNotEmpty,} from '../utils/myutils'

const getPost = async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  const searchOption : PostSearchOption = {
    ...req.query,
    id,
    usersId: req.query.ourGruop? req.userInfo.id : undefined
  };
  console.log("searchOption: ", searchOption);
  const posts = await postSvc.getPost(searchOption);
  res.status(200).json(posts);
}

const putPost = async (req: express.Request, res: express.Response) => {
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
    usersId: req.userInfo.id,
  };

  const esentialItems = {
    companiesId,
    usersId: postForm.usersId,
    level2CategoriesId,
    companyName,
    companyShortDesc,
    mainBussinessTags,
    companyContactAddress,
    fastfiveBranchesId,
  }

  checkDataIsNotEmpty(esentialItems);
  await postSvc.putPost(postForm);
  res.status(200).json({ message: "PUT_SUCCESS" });
}

const deletePost = async (req: express.Request, res: express.Response) => {
  const {id : postId} = req.params;
  await postSvc.deletePost(req.userInfo.id, postId);
  res.status(200).json({ message: "DELETE_SUCCESS" });
}

export default {
  putPost,
  getPost,
  deletePost,
}