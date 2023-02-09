import express from 'express';
import service_set from "../services";
const { cateSvc } = service_set;
import {checkDataIsNotEmpty,} from '../utils/myutils'

const createCategories = async (req: express.Request, res: express.Response) => {
  const { categoryName } = req.body;
  await cateSvc.createCategories(+req.userInfo.id, categoryName);
  res.status(201).json({ message: "CATEGORY_CREATED" });
}

const getCategories = async (req: express.Request, res: express.Response) => {
  const { id: userId } = req.params;
  const categories = await cateSvc.getCategories({userId: +userId});
  res.status(200).json({ data: categories });
}

const updateCategories = async (req: express.Request, res: express.Response) => {
  const { id: categoryId } = req.params;
  const { categoryName } = req.body;
  await cateSvc.updateCategories(+req.userInfo.id, +categoryId, categoryName);
  res.status(200).json({ message: "CATEGORY_UPDATED" });
}

const deleteCategories = async (req: express.Request, res: express.Response) => {
  const { id: categoryId } = req.params;
  checkDataIsNotEmpty({categoryId});
  await cateSvc.deleteCategories(+req.userInfo.id, +categoryId);
  res.status(200).json({ message: "CATEGORY_DELETED" });
}

export default {
  createCategories,
  getCategories,
  deleteCategories,
  updateCategories,
}