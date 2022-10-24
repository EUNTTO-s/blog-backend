import express from "express";
export function getArrayLength(arr: any[]): number;
export const maxInterval: 12;
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

export var SomeVar: { a: SomeType };
export interface SomeType {
  count: number;
}