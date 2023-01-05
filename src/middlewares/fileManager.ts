import multer from "multer";
import fs from "fs";
import type express from "express";
import type { Request, Response, NextFunction } from "express";

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!req.res.locals.fileupload) {
      req.res.locals.fileupload = {};
  }
  const uploadRootFolder = `${__dirname}/../../uploads`;
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

const removeFolderOnEmptyProperty = (req: Request, res: Response, next: NextFunction) => {
  const uploadFieldNames = ["companyInfoUrl", "companyImgUrl"];
  const target = `${__dirname}/../../uploads${req.originalUrl}/${req.userInfo.id}`;
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
  const target = `${__dirname}/../../uploads${req.originalUrl}/${req.userInfo.id}`;
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
  upload,
  removeFolderOnEmptyProperty,
  removeFolder,
};
