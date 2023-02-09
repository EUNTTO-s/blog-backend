import express from 'express';
import topicCtl from '../controllers/topic.controller';
import {asyncWrap} from '../utils/myutils';
const router = express.Router();

// routing
router.get('/topics', asyncWrap(topicCtl.getTopics));

export default router;