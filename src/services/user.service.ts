import bcrypt from 'bcryptjs';
import daoset from '../models';
import jwt from 'jsonwebtoken';

const dao = daoset.userDao;

async function makeHash(password : string) {
  return await bcrypt.hash(password, 10)
}

async function login(email: string, password: string) {
  // 매칭되는 유저가 있는 지 확인
  const userInfo = await dao.findUserByEmail(email);
  // 있으면 토큰 발행
  if (!userInfo) {
  throw {status: 404, message: '등록되지 않은 이메일이에요.'}
  }
  // 비밀번호가 다른 지 확인
  else if (!bcrypt.compareSync(password, userInfo.password)) {
  throw {status: 404, message: '비밀번호가 달라요.'}
  }
  const token = jwt.sign({ id: userInfo.id }, 'server_made_secret_key', { expiresIn: '24h' });
  return token;
}

async function addUser(userInfo : {email: string, password: string, nickname: string, profile_image: string}) {
  const {email} = userInfo;
  // 1. 중복되는 유저 있는 지 확인
  const searchResult = await dao.findUserByEmail(email);
  if (searchResult) {
    throw {status: 400, message: '이미 해당 이메일이 등록되어있어요 '};
  }

  // 2. 중복되는 유저가 없으면 추가
  userInfo = {...userInfo, password: await makeHash(userInfo.password)};
  await dao.addUser(userInfo);
}

async function getAllUser() {
  return await dao.getAllUser();
}

async function findUserById(userId: string) {
  return await dao.findUserById(userId);
}

export default {
  login,
  addUser,
  getAllUser,
  findUserById,
}