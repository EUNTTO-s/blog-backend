
import daoset from '../models';
const cmtDao = daoset.cmtDao;
const userDao = daoset.userDao;

async function addCommentOnPost(userId: string, postId: string, comment: string) {
  // 유저 존재 유무 확인
  const foundUser = await userDao.findUserById(userId)
                  .catch((err) => {
                    throw {status: 500, message: err.message || '인증 실패'}
                  });
  if (!foundUser) {
    throw {status: 400, message: '해당 유저가 존재하지 않습니다'}
  }

  // 추가
  await cmtDao.addCommentOnPost(userId, postId, comment)
            .catch(e => {
              throw {status: 500, message: '코멘트 추가에 실패했습니다.'}
            });
}

async function findCommentById(commentId: string) {
  const comment = await cmtDao.findCommentById(commentId)
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
  const userInfo = await userDao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 코멘트 정보 조회
  const commentInfo = await cmtDao.findCommentById(commentId);
  if (!commentInfo) {
    throw {status: 404, message: "코멘트가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  if (userId != commentInfo.user_id) {
    throw {status: 403, message: "작성자만 수정할 수 있습니다."};
  }
  // 코멘트 업데이트
  await cmtDao.updateComment(commentId, comment);
}

async function deleteComment(commentId: string, userId: string) {
  // 유저 정보 조회
  const userInfo = await userDao.findUserById(userId);
  if (!userInfo) {
    throw {status: 404, message: "유저 아이디가 존재하지 않습니다."};
  }
  // 코멘트 정보 조회
  const commentInfo = await cmtDao.findCommentById(commentId);
  if (!commentInfo) {
    throw {status: 404, message: "코멘트가 존재하지 않습니다."};
  }
  // 작성 권한 확인
  if (userId != commentInfo.user_id) {
    throw {status: 403, message: "작성자만 삭제할 수 있습니다."};
  }
  // 코멘트 삭제
  await cmtDao.deleteComment(commentId);
}

export default {
  addCommentOnPost,
  findCommentById,
  updateComment,
  deleteComment,
}