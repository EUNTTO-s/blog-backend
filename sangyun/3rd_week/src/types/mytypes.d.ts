import type {Request, Response, NextFunction} from 'express';

type InfoType  = {
  id: string,
  email?: string,
  nickname?: string
}
declare module "jsonwebtoken" {
  interface UserInfoPayload extends JwtPayload, InfoType {
  }
  function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions & { complete?: false }): UserInfoPayload;
  function sign(payload: InfoType, secretOrPrivateKey: Secret, options?: SignOptions, ): string;
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: "mysql" | "mariadb";
    }
  }

  namespace Express {
    export interface Request {
      userInfo?: InfoType;
    }
  }
  interface MyError extends Error {
    sqlMessage?: string;
    status: number;
  }
}