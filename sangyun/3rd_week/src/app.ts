import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import router  from "./routers";
import cors from 'cors';

export const createApp = () => {
  const app = express();
  var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(router);

  return app;
};