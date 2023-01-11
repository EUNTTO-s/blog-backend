import express from 'express';
import service_set from "../services";
import {checkDataIsNotEmpty,} from '../utils/myutils'
const { grassSvc } = service_set;

const getGrasses = async (req: express.Request, res: express.Response) => {
  let {userId, withinDay, timezone} = req.query as unknown as GrassSearchType;
  checkDataIsNotEmpty({userId});
  if (isNaN(userId)) {
    throw {status: 400, message: "userId는 숫자여야 합니다."}
  }
  const grasses = await grassSvc.getGrasses({userId, withinDay, timezone});
  res.status(200).json({ data: grasses });
}

export default {
  getGrasses,
}