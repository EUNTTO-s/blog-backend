import express from "express";
import service_set from "../services";
const { user_Svc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 회원가입
const signUp = async (req: express.Request, res: express.Response) => {
    const { username, email, password }: UserInputType = req.body;
    checkDataIsNotEmpty({ username, email, password });

    await user_Svc.signUp(username, email, password);
    res.status(201).json({ messsage: "USER_CREATED" });
};

// 로그인
const login = async (req: express.Request, res: express.Response) => {
    const { email, password }: UserInputType = req.body;
    checkDataIsNotEmpty({ email, password });

    const token = await user_Svc.login(email, password);
    res.status(200).send({ message: "LOGIN_SUCCESS", token });
};

// 유저 정보
const getMe = async (req: express.Request, res: express.Response) => {
    const userInfo = await user_Svc.getMe(Number(req.userInfo.id));
    res.status(200).json({ userInfo });
};

export default {
    signUp,
    login,
    getMe,
};
