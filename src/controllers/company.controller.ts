import express from 'express';
import service_set from '../services'
const {companySvc} = service_set;

const getCompanies = async (req: express.Request, res: express.Response) => {
  const companies = await companySvc.getCompanies();
  res.status(200).json(companies);
}

export default {
  getCompanies,
}