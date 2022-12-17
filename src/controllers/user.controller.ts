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

// 이메일 중복 체크
const isExistEmail = async (req: express.Request, res: express.Response) => {
    const { email }: UserInputType = req.body;
    checkDataIsNotEmpty({ email });
    await user_Svc.isExistEmail(email);
    res.status(200).json({ message: "AVAILABLE EMAIL" });
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

// 회원 등급 판별
const getUserGrade = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const userGradeInfo = await user_Svc.getUserGrade(Number(userId));
    res.status(200).json({ userGradeInfo });
};

export default {
    signUp,
    isExistEmail,
    login,
    getMe,
    getUserGrade,
};
