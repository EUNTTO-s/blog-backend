import express from "express";
import service_set from "../services";
const { followSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 팔로우 하기
const folllowRequest = async (req: express.Request, res: express.Response) => {
    const { target_users_id }: followInputType = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, target_users_id });

    await followSvc.folllowRequest(userId, target_users_id);
    res.status(201).json({ message: "FOLLOW_SUCCESSFULLY" });
};

// 언팔로우 하기
const unfolllowRequest = async (req: express.Request, res: express.Response) => {
    const { followId }: followInputType = req.body;
    checkDataIsNotEmpty({ followId });

    await followSvc.unfolllowRequest(followId);
    res.status(201).json({ message: "UNFOLLOW_SUCCESSFULLY" });
};

// 팔로우 리스트 보기
const findFollowList = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId });

    const findList = await followSvc.findFollowList(userId);
    res.status(200).json({ data: findList });
};

export default {
    folllowRequest,
    unfolllowRequest,
    findFollowList,
};
