import express from 'express';
import service_set from "../services";
const { topicSvc } = service_set;

const getTopics = async (req: express.Request, res: express.Response) => {
  const topics = await topicSvc.getTopics({});
  res.status(200).json({ data: topics });
}

export default {
  getTopics,
}