
declare module "custom-module" {

  type Request = import("express").Request;
  type Response = import("express").Response;

  export interface ServiceInterface {
    test(req: Request, res: Response) : any
  }

  export namespace custom_namespace {
    export interface CustomInterface {
      text: string;
    }
    export interface AddFunc {
      (source: string, subString: string): boolean;
    }
  }
}