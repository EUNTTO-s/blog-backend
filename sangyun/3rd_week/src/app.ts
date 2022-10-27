import express  from "express";
import dotenv from 'dotenv';
dotenv.config();
import router  from "./routers";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(router);

  return app;
};