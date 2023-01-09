import express from "express";
import service_set from "../services";
const { followSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 팔로우 하기
const followRequest = async (req: express.Request, res: express.Response) => {
    const { targetUsersId }: followInputType = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, targetUsersId });

    await followSvc.followRequest(userId, targetUsersId);
    res.status(201).json({ message: "FOLLOW_SUCCESSFULLY" });
};

// 언팔로우 하기
const unfollowRequest = async (req: express.Request, res: express.Response) => {
    const { id: targetUsersId } = req.params;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, targetUsersId });

    await followSvc.unfollowRequest(userId, targetUsersId);
    res.status(201).json({ message: "UNFOLLOW_SUCCESSFULLY" });
};

// 팔로잉 리스트 보기
const getFollowingList = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId });

    const getList = await followSvc.getFollowingList(userId);
    res.status(200).json({ data: getList });
};

// 팔로워 리스트 보기
const getFollowerList = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId });

    const getList = await followSvc.getFollowerList(userId);
    res.status(200).json({ data: getList });
};

export default {
    followRequest,
    unfollowRequest,
    getFollowingList,
    getFollowerList,
};
