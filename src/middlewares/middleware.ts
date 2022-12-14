import type express from "express";
import jwt from "jsonwebtoken";
// import service from "../services";

async function authMiddleware(...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> {
    const token = req.headers.authorization;
    const decodedToken = decodeToken(token);
    req.userInfo = { id: decodedToken.id };
    next();
}

async function adminMiddleware(...[req, _, next]: Parameters<express.RequestHandler>): Promise<any> {
    const userInfo = req.userInfo;
    if (userInfo.email != "admin@gmail.com") {
        throw { status: 403, message: "not permitted" };
    }
    next();
}

function decodeToken(token: string) {
    try {
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(`err: ${err}`);
        throw { status: 401, message: "unauthorized" };
    }
}

// error handling 미들웨어
const errorHandler: express.ErrorRequestHandler = (err: MyError, _1, res, _2) => {
    // 흐름상 에러가 검출되면 로그 표시 및 클라이언트에게 전달
    let responseInfo = err;
    if (err.sqlMessage) {
        console.log(err.sqlMessage);
        responseInfo = { ...err, status: 500, message: "failed" };
    }
    console.log("err LOG:", err);
    res.status(responseInfo.status || 500).send({ message: responseInfo.message || "" });
};

export default {
    authMiddleware,
    adminMiddleware,
    errorHandler,
};
