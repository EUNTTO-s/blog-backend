import {Request, Response, NextFunction} from 'express';

declare module "express" {
  export interface Request {
    /** Enable or disable file poster */
    userInfo?: string;

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

  type ExpressFunction = (req: Request, res: Response, next: NextFunction) => void;
}