import type express from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> => {
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    req.userInfo = { id: decodedToken.id };
    next();
}

const adminMiddleware = async (...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> => {
    const userInfo = req.userInfo;
    if (userInfo.email != "admin@gmail.com") {
        throw { status: 403, message: "not permitted" };
    }
    next();
}

const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(`err: ${err}`);
        throw { status: 401, message: "unauthorized" };
    }
}

// error handling 미들웨어
const errorHandler: express.ErrorRequestHandler = (err: MyError, _1, res, _2) => {
    // 흐름상 에러가 검출되면 로그 표시 및 클라이언트에게 전달
    let responseInfo = err;
    if (err.sqlMessage) {
        console.log(err.sqlMessage);
        responseInfo = { ...err, status: 500, message: "failed" };
    }
    console.log("err LOG:", err);
    res.status(responseInfo.status || 500).send({ message: responseInfo.message || "" });
};

import multer from 'multer';
import fs from 'fs';

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const folderLocation = `./uploads/` + req.userInfo.id || 'test';
  console.log("file: ", file);
  if (!req.res.locals.fileupload) {
    req.res.locals.fileupload = {};
  }
  req.body[file.fieldname] = `${req.userInfo.id || 'test'}/${file.originalname}`;
  // 개별 회사 게시글마다의 폴더 생성
  if (!req.res.locals.fileupload.fileUploadWasRequested) {
    try {
      fs.rmdirSync(`${folderLocation}`, {recursive: true});
    } catch (err) {
      console.log("nothing to delete");
    }
    fs.mkdirSync(`${folderLocation}`);
  }
  req.res.locals.fileupload.fileUploadWasRequested = true;
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const foldername = req.userInfo.id || 'test';
    cb(null, `./uploads/${foldername}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage, fileFilter });

export default {
    authMiddleware,
    adminMiddleware,
    errorHandler,
    upload,
};
