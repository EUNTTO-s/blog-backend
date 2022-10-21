import {Request, Response, NextFunction} from 'express';
declare module "express" {
  export interface Request {
    /** Enable or disable file poster */
    userInfo?: InfoType;

    // Other FilePond plugin options here...
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TYPEORM_CONNECTION: "mysql" | "mariadb";
    }
  }

  // FOR TEST
  interface Global_type {
        id: string;
  }
  interface MyError  {
    sqlMessage?: string;
    status: number;
    message?: string;
  }

  type Expfunc = (req: Request, res: Response, next: NextFunction) => Promise<any>;
}