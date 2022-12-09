import express from "express";
export as namespace custom_module;

type routerHandler = (req: express.Request, res: express.Response) => Promise<any>

export interface serviceInterface {
  test : routerHandler
}

export namespace custom_namespace {
  export interface CustomInterface {
    text: string;
  }
  export interface AddFunc {
    (source: string, subString: string): boolean;
  }
}