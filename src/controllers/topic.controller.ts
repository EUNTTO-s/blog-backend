import express from 'express';
import topicSvc from '../services/topic.service'

const getTopics = async (req: express.Request, res: express.Response) => {
  const topics = await topicSvc.getTopics();
  res.status(200).json(topics);
}

export default {
  getTopics,
}