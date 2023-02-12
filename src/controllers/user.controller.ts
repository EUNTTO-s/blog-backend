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

// 닉네임 중복 체크
const isExistNickname = async (req: express.Request, res: express.Response) => {
    const { nickname }: UserInputType = req.body;
    checkDataIsNotEmpty({ nickname });
    const duplicateNickname = await userSvc.isExistNickname(nickname);
    res.status(200).json({ duplicateNickname });
};

// 이메일(아이디) 중복 체크
const isExistEmail = async (req: express.Request, res: express.Response) => {
    const { email }: UserInputType = req.body;
    checkDataIsNotEmpty({ email });
    const duplicateEmail = await userSvc.isExistEmail(email);
    res.status(200).json({ duplicateEmail });
};

// 로그인
const login = async (req: express.Request, res: express.Response) => {
    const { email, password }: UserInputType = req.body;
    checkDataIsNotEmpty({ email, password });

    const token = await userSvc.login(email, password);
    res.status(200).send({ message: "LOGIN_SUCCESS", token });
};

// 프로필 업데이트
const updateProfile = async (req: express.Request, res: express.Response) => {
    const { nickname, blogTitle, profileIntro, linkUrls }: ProfileInputType = req.body;
    let { profileImg } = req.body;
    profileImg = profileImg === undefined ? req.file : "";
    const input : ProfileInputType = {
        nickname,
        blogTitle,
        profileIntro,
        userId: +req.userInfo.id,
        profileImg,
        linkUrls: linkUrls? JSON.parse(req.body.linkUrls) : undefined
    };
    await userSvc.updateProfile(input);
    res.status(200).json({ message: "PROFILE_UPDATED" });
};

// 유저 정보
const getUserInfo = async (req: express.Request, res: express.Response) => {
    let userId = req.params.id === undefined && !req.query.search ? Number(req.userInfo?.id) : Number(req.params.id);

    const userInfos = await userSvc.findUsers({ userId, search: req.query.search as string });
    let data = req.query.search ? userInfos : userInfos[0];
    res.status(200).json({ data });
};

export default {
    signUp,
    isExistNickname,
    isExistEmail,
    login,
    updateProfile,
    getUserInfo,
};
