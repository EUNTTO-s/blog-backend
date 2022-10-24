import express from 'express';
import allRouter from './all-router';

const router = express.Router();
router.use('', allRouter);

export default router;