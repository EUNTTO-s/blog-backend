import bcrypt from 'bcryptjs';
import dao from '../models/dao';
import jwt from 'jsonwebtoken';

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

async function addCommentOnPost(userId: string, postId: string, comment: string) {
  // 유저 존재 유무 확인
  const foundUser = await dao.findUserById(userId)
                  .catch((err) => {
                    throw {status: 500, message: err.message || '인증 실패'}
                  });
  if (!foundUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 추가
  await dao.addCommentOnPost(userId, postId, comment)
            .catch(e => {
              throw {status: 500, message: '코멘트 추가에 실패했습니다.'}
            });
}

async function findCommentById(commentId: string) {
  const comment = await dao.findCommentById(commentId)
    .catch(err => {
      throw {...err, status: 500}
    });
  if (!comment) {
    throw {status: 404, message: "코멘트를 찾지 못했습니다."}
  }
  return comment;
}

async function updateComment(commentId: string, userId: string, comment: string) {
  // 유저 정보 조회
  const userInfo = await dao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 코멘트 정보 조회
  const commentInfo = await dao.findCommentById(commentId);
  if (!commentInfo) {
    throw {status: 404, message: "코멘트가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  if (userId != commentInfo.user_id) {
    throw {status: 403, message: "작성자만 수정할 수 있습니다."};
  }
  // 코멘트 업데이트
  await dao.updateComment(commentId, comment);
}

async function deleteComment(commentId: string, userId: string) {
  // 유저 정보 조회
  const userInfo = await dao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 코멘트 정보 조회
  const commentInfo = await dao.findCommentById(commentId);
  if (!commentInfo) {
    throw {status: 404, message: "코멘트가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  if (userId != commentInfo.user_id) {
    throw {status: 403, message: "작성자만 삭제할 수 있습니다."};
  }
  // 코멘트 삭제
  await dao.deleteComment(commentId);
}

async function addPost(contents: string, image_url: string, userId: string) {
  // 유저 정보 조회
  const userInfo = await dao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  return await dao.addPost(contents, image_url, userId);
}

async function getAllPost() {
  return await dao.getAllPost();
}

async function updatePost(userId: string, postId:string, contents: string, imageUrl: string) {
  // 유저 정보 조회
  const userInfo = await dao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  const post = await dao.getPostByPostId(postId);
  if (userId != String(post.userId)) {
    throw {status: 403, message: "작성자만 변경할 수 있습니다."};
  }
  // 게시글 변경
  await dao.updatePost(postId, contents, imageUrl);
  const updatedPost = dao.getPostByPostId(postId);
  return updatedPost;
}

async function deletePost(userId: string, postId:string) {
  // 유저 정보 조회
  const userInfo = await dao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  const post = await dao.getPostByPostId(postId);
  if (userId != String(post.userId)) {
    throw {status: 403, message: "작성자만 삭제할 수 있습니다."};
  }
  // 게시글 삭제
  await dao.deletePost(postId);
}

async function getPostByPostId(postId: string) {
  const post = await dao.getPostByPostId(postId);
  if (!post) {
    throw {status: 404, message: "ID에 해당하는 게시글이 존재하지 않습니다."};
  }
  return post;
}

async function getPostsByUserId(userId: string) {
  await dao.getPostsByUserId(userId);
}

async function addLikePost(userId: string, postId: string) {
  await dao.addLikePost(userId, postId);
}

async function findUserById(userId: string) {
  return await dao.findUserById(userId);
}

export default {
  login,
  addUser,
  getAllUser,
  addCommentOnPost,
  findCommentById,
  updateComment,
  deleteComment,
  addPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostByPostId,
  getPostsByUserId,
  addLikePost,
  findUserById
}