import dao_set from "../models";
const { commentDao, postDao } = dao_set;

// 댓글 생성
const createComments = async (postId: string, content: string, userId: string) => {
    const [post] = await postDao.getPosts({ postId });
    if (!post) {
        throw { status: 400, message: "존재하지 않는 게시글입니다." };
    }
    if (content.length > 1000) {
        throw { status: 400, message: "댓글은 1000자 이상 작성 할 수 없습니다" };
    }
    await commentDao.createComments(postId, content, userId);
};

// 특정 게시글의 댓글 가져오기
const getComments = async (postId: string) => {
    if (!getComments) {
        throw { status: 400, message: "존재하지 않는 게시글입니다." };
    }
    const comments = await commentDao.getComments(postId);
    return comments;
};

// 댓글 수정
const updateComments = async (content: string, commentId: string, userId: string) => {
    if (content.length > 1000) {
        throw { status: 400, message: "댓글은 1000자 이상 작성 할 수 없습니다" };
    }
    await commentDao.updateComments(content, commentId, userId);
};

// 댓글 삭제
const deleteComments = async (commentId: string, userId: string) => {
    await commentDao.deleteComments(commentId, userId);
};

export default {
    createComments,
    getComments,
    updateComments,
    deleteComments,
};
