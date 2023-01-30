import express from "express";
import service_set from "../services";
const { commentSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 댓글 생성
const createComments = async (req: express.Request, res: express.Response) => {
    const { postId, content }: CommentInputType = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ postId, content, userId });

    await commentSvc.createComments(+postId, content, +userId);
    res.status(201).json({ message: "COMMENT_CREATED" });
};

// 특정 게시글의 댓글 가져오기
const getComments = async (req: express.Request, res: express.Response) => {
    const postId = req.params.id;
    checkDataIsNotEmpty({ postId });

    const comments = await commentSvc.getComments(postId);
    res.status(200).json({ data: comments });
};

// 댓글 수정
const updateComments = async (req: express.Request, res: express.Response) => {
    const { content }: CommentInputType = req.body;
    const commentId = req.params.id;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ commentId, content, userId });

    await commentSvc.updateComments(content, commentId, userId);
    res.status(200).json({ message: "UPDATE_SUCCESSFULLY" });
};

// 댓글 삭제
const deleteComments = async (req: express.Request, res: express.Response) => {
    const commentId = req.params.id;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ commentId, userId });

    await commentSvc.deleteComments(commentId, userId);
    res.status(200).json({ message: "DELETE_SUCCESSFULLY" });
};

export default {
    createComments,
    getComments,
    updateComments,
    deleteComments,
};
