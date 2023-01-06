import express from 'express';
import cateSvc from '../services/category.service'
import {checkDataIsNotEmpty,} from '../utils/myutils'

const createCategories = async (req: express.Request, res: express.Response) => {
  const { categoryName } = req.body;
  await cateSvc.createCategories(req.userInfo.id, categoryName);
  res.status(200).json('CATEGORY_CREATED');
}

const getCategories = async (req: express.Request, res: express.Response) => {
  const {userId} = req.params;
  const categories = await cateSvc.getCategories({userId});
  res.status(200).json(categories);
}

const updateCategories = async (req: express.Request, res: express.Response) => {
  const { categoryName, categoryId } = req.body;
  await cateSvc.updateCategories(req.userInfo.id, categoryId, categoryName);
  res.status(200).json('CATEGORY_UPDATED');
}

const deleteCategories = async (req: express.Request, res: express.Response) => {
  const { categoryId } = req.body;
  checkDataIsNotEmpty({categoryId});
  await cateSvc.deleteCategories(req.userInfo.id, categoryId);
  res.status(200).json('CATEGORY_DELETED');
}

export default {
  createCategories,
  getCategories,
  deleteCategories,
  updateCategories,
}