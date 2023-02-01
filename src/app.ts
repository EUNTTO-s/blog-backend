import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
  path:
    process.env.NODE_ENV == undefined
      ? `${__dirname}/../.env`
      : `${__dirname}/../.${process.env.NODE_ENV}.env`,
});
import morgan from 'morgan';
import router  from "./routers";
import { morganCustomFormat } from "./utils/myutils";
import fileManager from "./middlewares/fileManager";
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const createApp = () => {
  const app = express();
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan(morganCustomFormat));
  app.use(express.json());
  app.use(router);
  fileManager.makeUploadFolder();
  return app;
};