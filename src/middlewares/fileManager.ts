import multer from "multer";
import fs from "fs";
import type { Request} from "express";

const NODE_ENV = process.env.NODE_ENV;
const appendPath = NODE_ENV? `${NODE_ENV}`: '.';

const getTempDir = () => {
  return `${__dirname}/../../uploads_/${appendPath}/temp`
}

const getUploadRootDir = () => {
  return `${__dirname}/../../uploads_/${appendPath}/`;
}

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const {fieldname, mimetype} = file;
  const imageNameList = ['thumbnail', 'profileImg'];
  const found = imageNameList.find(v => v == fieldname);
  if (found && !(mimetype.includes("image"))) {
    cb({message: '이미지 형식이 아닙니다.', status: 400, name: ''});
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, getTempDir());
  },
});

const upload = multer({ storage: storage, fileFilter });

const makeUploadFolder = () => {
  try {
    fs.readdirSync(getTempDir())
  } catch (e) {
    console.log("업로드 폴더를 생성합니다");
    fs.mkdirSync(getTempDir(), {recursive: true});
  }
}

const updateFile = async (path: string, id: number, file: Express.Multer.File | "") => {
  if (file === "") {
    return "";
  }
  if (file === undefined) {
    return undefined;
  }
  const oldPath = file.path;
  const newPath = `${getUploadRootDir()}/${path}/${id}/`
  fs.mkdirSync(newPath, { recursive: true });
  fs.rename(oldPath, newPath + file.originalname, function (err) {
    if (err) throw err
  });
  const filePath = `/${path}/${id}/${file.originalname}`;
  return filePath;
}

export default {
  upload,
  getTempDir,
  getUploadRootDir,
  makeUploadFolder,
  updateFile,
};
