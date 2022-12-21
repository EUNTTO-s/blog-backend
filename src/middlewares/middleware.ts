import type express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import service_set from "../services";
const { cateSvc } = service_set;

const authMiddleware = async (...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> => {
    const token = req.headers.authorization;
    let decodedToken;
    try {
        decodedToken = decodeToken(token);
    } catch {
        throw { status: 400, message: "토큰이 유효하지 않습니다." };
    }
    req.userInfo = { id: decodedToken.id, email: decodedToken.email };
    console.log(req.userInfo);
    next();
};

const adminMiddleware = async (...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> => {
    const userInfo = req.userInfo;
    if (userInfo.email != "admin@gmail.com") {
        throw { status: 403, message: "접근 권한이 없습니다." };
    }
    next();
};

const decodeToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(`err: ${err}`);
        throw { status: 401, message: "unauthorized" };
    }
};

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

import multer from "multer";
import fs from "fs";

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!req.res.locals.fileupload) {
        req.res.locals.fileupload = {};
    }

    const uploadRootFolder = "./uploads";
    const fileSpecificFolder = `${req.originalUrl}/${req.userInfo.id || "test"}/${file.fieldname}`;
    const folderLocation = `${uploadRootFolder}${fileSpecificFolder}`;
    // folderLocation는 다른 함수에서 파일 저장 위치를 설정할 때 사용됨.
    req.res.locals.fileupload.folderLocation = folderLocation;
    // body값에 저장하여 DB에 url을 저장하기 위해 사용됨.
    req.body[file.fieldname] = `${fileSpecificFolder}/${file.originalname}`;

    // 파일을 저장할 폴더 생성
    try {
        fs.rmdirSync(`${folderLocation}`, { recursive: true });
    } catch (err) {
        console.log("nothing to delete");
    }
    fs.mkdirSync(`${folderLocation}`, { recursive: true });
    cb(null, true);
};

const categoryFilter = async (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!req.res.locals.fileupload) {
      req.res.locals.fileupload = {};
  }
  // multer에서 새로 변경된 카테고리 URL을 body 에 져장.
  // process에서 이전 카테고리 URL을 body에 저장.
  // 이후, 이전 URL의 파일을 제거.

  let categoryId;
  if (req.method == 'POST') {
    const { category_name, description } = req.body;
    let cate  = await cateSvc.getCategory_1_byCateName(category_name);
    if (cate) {
      cb(new Error('ALREADY_EXIST_CATEGORY_NAME'));
    }
    try {
      await cateSvc.createCategory(1, "hi", category_name, description);
      cate  = await cateSvc.getCategory_1_byCateName(category_name);
    } catch (e) {
      cb(new Error('FAILD_CREATE_CATEGORY'));
    }
    categoryId = cate.id;
    req.body.categoryId = cate.id;
  } else {
    categoryId = req.body.categoryId;
  }

  const baseUrl = '/category';

  const uploadRootFolder = "./uploads";
  const fileSpecificFolder = `${baseUrl}/${categoryId || "test"}/${file.fieldname}`;
  const folderLocation = `${uploadRootFolder}${fileSpecificFolder}`;
  // folderLocation는 다른 함수에서 파일 저장 위치를 설정할 때 사용됨.
  req.res.locals.fileupload.folderLocation = folderLocation;
  // body값에 저장하여 DB에 url을 저장하기 위해 사용됨.
  req.body[file.fieldname] = `${fileSpecificFolder}/${file.originalname}`;

  // 파일을 저장할 폴더 생성
  try {
      fs.rmdirSync(`${folderLocation}`, { recursive: true });
  } catch (err) {
      console.log("nothing to delete");
  }
  fs.mkdirSync(`${folderLocation}`, { recursive: true });
  cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { folderLocation } = req.res.locals.fileupload;
        cb(null, folderLocation);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage, fileFilter });
const categoryUpload = multer({ storage: storage, fileFilter: categoryFilter });

const removeFolderOnEmptyProperty = (req: Request, res: Response, next: NextFunction) => {
    const uploadFieldNames = ["companyInfoUrl", "companyImgUrl"];
    const target = `./uploads${req.originalUrl}/${req.userInfo.id}`;
    uploadFieldNames.forEach((fieldName) => {
        if (req.body[fieldName] != "") return;
        try {
            fs.rmdirSync(`${target}/${fieldName}`, { recursive: true });
        } catch (err) {
            console.log("nothing to delete");
        }
    });
    next();
};

const removeFolder = (req: Request, res: Response, next: NextFunction) => {
    const uploadFieldNames = ["companyInfoUrl", "companyImgUrl"];
    const target = `./uploads${req.originalUrl}/${req.userInfo.id}`;
    uploadFieldNames.forEach((fieldName) => {
        try {
            fs.rmdirSync(`${target}/${fieldName}`, { recursive: true });
        } catch (err) {
            console.log("nothing to delete");
        }
    });
    next();
};

export default {
    authMiddleware,
    adminMiddleware,
    errorHandler,
    upload,
    categoryUpload,
    removeFolderOnEmptyProperty,
    removeFolder,
    categoryFilter,
};
