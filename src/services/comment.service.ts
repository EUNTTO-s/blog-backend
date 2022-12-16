import daoset from '../models';
import jwt from "jsonwebtoken";
const cmtDao = daoset.cmtDao;
const userDao = daoset.user_Dao;

const addCommentOnPost = async (userId: number, postId: number, comment: string, is_secret: number) => {
  // 유저가 존재하는지 확인
  const existUser = await userDao.findUserById(userId);
  if (!existUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 댓글 길이 확인
  if(comment.length > 1000) {
    throw {status: 400, message: '댓글은 1000자 이상 작성 할 수 없습니다'}
  }

  // 댓글 갯수 확인
  const CommentCount = await cmtDao.getCommentCountByPostId(postId);
  if(CommentCount.count > 1000) {
    throw {status: 400, message: "댓글은 1000개 이상 작성 할 수 없습니다"}
  }

  // 댓글 추가
  await cmtDao.addCommentOnPost(userId, postId, comment, is_secret);
}

const addCommentOnComment = async (userId: number, postId: number, commentId: number, comment: string, is_secret: number) => {
  // 유저가 존재하는지 확인
  const existUser = await userDao.findUserById(userId);
  if (!existUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 댓글 길이 확인
  if(comment.length > 1000) {
    throw {status: 400, message: '댓글은 1000자 이상 작성 할 수 없습니다'}
  }

  // 댓글 갯수 확인
  const CommentCount = await cmtDao.getCommentCountByPostId(postId);
  if(CommentCount.count > 1000) {
    throw {status: 400, message: "댓글은 1000개 이상 작성 할 수 없습니다"}
  }

  const SEQ = await cmtDao.findSEQByCommentId(commentId);

  // 댓글 추가
  await cmtDao.addCommentOnComment(userId, postId, commentId, comment, SEQ.SEQ , is_secret);
}

const getCommentOnPost = async (postId: number, page: number ,token?: string) => {
  // 토큰이 있을 때 토큰에 해당하는 user_id 받아오고 없을 시 user_id = undefined
  let user_id: number;
  if(token !== undefined) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    user_id = Number(decodedToken.id);
  }
  
  // 페이지네이션을 위한 연산
  const pagination: number = ((Number(page) - 1) * 20);

  const result = await cmtDao.getCommentOnPost(postId, pagination);
  const postWriter: number = result[0].writer;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  
  result.forEach((item: any) => {
    // 한국 표준시로 바꾸기
    let tmpdate = new Date(item.created_at);
    let tmpdate2 = tmpdate.getTime();
    let kr_curr = new Date(tmpdate2 + KR_TIME_DIFF);
  
    let year = kr_curr.toISOString().slice(0,4);
    let month = item.created_at.toISOString().slice(5,7);
    let day = kr_curr.toISOString().slice(8,10);
    let hour = kr_curr.toISOString().slice(11,13);
    let minute = kr_curr.toISOString().slice(14,16);
    let noon = Number(hour) > 12 ? '오후' : '오전';
    item.created_at = `${year}년 ${month}월 ${day}일 ${noon} ${hour}:${minute}`;

    // 비밀 댓글에 대한 열람 권한이 없을 시
    if(item.is_secret === 1 && item.users_id !== user_id && postWriter !== user_id) item.comment_content = "이 댓글은 작성자만 볼 수 있습니다."
  })
  return result;
}

const updateComment = async (userId: number, commentId: number, comment: string) => {
  // 유저가 존재하는지 확인
  const existUser = await userDao.findUserById(userId);
  if (!existUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 댓글 길이 확인
  if(comment.length > 1000) {
    throw {status: 400, message: '댓글은 1000자 이상 작성 할 수 없습니다'}
  }

  // 유저 권한 확인
  const commentWriter = await cmtDao.findUserByCommentId(commentId);
  if (Number(commentWriter.users_id) !== userId) {
    throw {status: 400, message: '수정 권한이 없습니다'}
  }

  await cmtDao.updateComment(commentId, comment);
}

const deleteComment = async (userId: number, commentId: number) => {
  const existUser = await userDao.findUserById(Number(userId));
  if(!existUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 유저 권한 확인
  const commentWriter = await cmtDao.findUserByCommentId(commentId);
  if (Number(commentWriter.users_id) !== userId) {
    throw {status: 400, message: '삭제 권한이 없습니다'}
  }

  await cmtDao.deleteComment(commentId);
}

export default {
  addCommentOnPost,
  addCommentOnComment,
  getCommentOnPost,
  updateComment,
  deleteComment
}