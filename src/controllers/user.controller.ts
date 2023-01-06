import express from "express";
import service_set from "../services";
const { userSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 회원가입
const signUp = async (req: express.Request, res: express.Response) => {
    const { nickname, email, password }: UserInputType = req.body;
    checkDataIsNotEmpty({ nickname, email, password });

    await userSvc.signUp(nickname, email, password);
    res.status(201).json({ message: "USER_CREATED" });
};

// 로그인
const login = async (req: express.Request, res: express.Response) => {
    const { email, password }: UserInputType = req.body;
    checkDataIsNotEmpty({ email, password });

    const token = await userSvc.login(email, password);
    res.status(200).send({ message: "LOGIN_SUCCESS", token });
};

// 유저 정보
const getMe = async (req: express.Request, res: express.Response) => {
    const userInfo = await userSvc.getMe(Number(req.userInfo.id));
    res.status(200).json({ userInfo });
};

export default {
    signUp,
    login,
    getMe,
};
