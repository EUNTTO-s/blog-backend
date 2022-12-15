import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dao_set from "../models";

const userDao = dao_set.user_Dao;

// 회원가입
const signUp = async (username: string, email: string, password: string) => {
    // 이메일 필수 값 체크
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        throw { message: "아이디는 이메일 형식이어야 합니다." };
    }
    // 중복 아이디 체크
    const existUser = await userDao.existUser(email);
    if (existUser) {
        throw { message: "이미 존재하는 아이디 입니다." };
    }
    // 비밀번호 필수 값 체크
    const pwRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    if (!pwRegex.test(password)) {
        throw {
            message: "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~16자리를 입력해주세요.",
        };
    }
    // 비밀번호 암호화 및 유저 생성 단계
    const hashed_password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    const createUser = await userDao.createUser(username, email, hashed_password);
    return createUser;
};

// 로그인
const login = async (email: string, password: string) => {
    // 아이디가 email 형식이 아닐 때
    if (!email.includes("@") || !email.includes(".")) {
        throw { message: "아이디는 이메일 형식이여야 합니다." };
    }
    // 매칭되는 유저가 있는 지 확인
    const userInfo = await userDao.findUser({email, includePwd: true});
    console.log("userInfo: ", userInfo);
    // 있으면 토큰 발행 없으면 에러
    if (!userInfo) {
        throw { status: 404, message: "아이디가 존재하지 않습니다." };
    }
    // 비밀번호가 다른 지 확인
    else if (!bcrypt.compareSync(password, userInfo.password)) {
        throw { status: 404, message: "비밀번호가 일치하지 않습니다." };
    }

    // 토큰 생성
    const token = jwt.sign({ id: userInfo.id }, process.env.SECRET_KEY);
    return token;
};

// 유저 정보
const getMe = async (userId: number) => {
    const userInfo = await userDao.findUser({userId});
    return userInfo;
};

// 회원 등급 판별
const getUserGrade = async (userId: number) => {
    let grade: string;
    // 일반 가입자 여부
    const checkGeneralUserRating = await userDao.checkGeneralUserRating(userId);
    if (!checkGeneralUserRating) {
        grade = "일반 가입자";
    }
    // 일반 가입자가 아닐 시, 멤버 등급 여부
    const checkMemberUserRating = await userDao.checkMemberUserRating(userId);
    if (checkMemberUserRating) {
        grade = "입주자";
    } else if (checkGeneralUserRating && !checkMemberUserRating) {
        grade = "퇴주자";
    }

    return grade;
};

export default {
    signUp,
    login,
    getMe,
    getUserGrade,
};
