import express from "express";
import service_set from "../services";
const { followSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 팔로우 하기
const follow = async (req: express.Request, res: express.Response) => {
    const { targetUsersId }: followInputType = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, targetUsersId });

    await followSvc.follow(userId, targetUsersId);
    res.status(201).json({ message: "FOLLOW_SUCCESSFULLY" });
};

// 언팔로우 하기
const unfollow = async (req: express.Request, res: express.Response) => {
    const { id: targetUsersId } = req.params;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, targetUsersId });

    await followSvc.unfollow(userId, targetUsersId);
    res.status(201).json({ message: "UNFOLLOW_SUCCESSFULLY" });
};

// 팔로잉 리스트 보기
const getFollowings = async (req: express.Request, res: express.Response) => {
    let userId = req.query.myFollowing? req.userInfo.id : req.params.id;
    checkDataIsNotEmpty({ userId });

    const list = await followSvc.getFollowings(userId, req.userInfo?.id);
    res.status(200).json({ data: list });
};

// 팔로워 리스트 보기
const getFollowers = async (req: express.Request, res: express.Response) => {
  let userId = req.query.myFollower? req.userInfo.id : req.params.id;
    checkDataIsNotEmpty({ userId });

    const list = await followSvc.getFollowers(userId, req.userInfo?.id);
    res.status(200).json({ data: list });
};

export default {
    follow,
    unfollow,
    getFollowings,
    getFollowers,
};
