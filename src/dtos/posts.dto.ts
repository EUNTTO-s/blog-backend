import express from 'express';
import { OpenRange } from "../types/post.types";
import { enumToArray } from "../utils/myutils";
import {
  MinLength,
  MaxLength,
  IsNumber,
  ArrayMaxSize,
  validate,
  IsIn,
} from 'class-validator';
import { Type, plainToClass, Transform } from 'class-transformer';
export class CreatePostDto {
  @MinLength(1, {message: '제목은 최소 1글자 이상이여야 합니다',})
  @MaxLength(300, {message: '제목은 최대 300글자 이하이여야 합니다',})
  title?: string;

  @IsNumber()
  @Type(()=>Number)
  userId?: number;

  @Type(()=>Number)
  cateId?: number;

  @MinLength(1, {message: '내용은 최소 1글자 이상이여야 합니다.',})
  @MaxLength(6500, {message: '내용은 최대 6000글자 이하이여야 합니다',})
  content?: string;

  thumnail?: Express.Multer.File;
  thumbnailImgUrl?: string;

  @IsIn(enumToArray(OpenRange), {message: "secretType가 0~2 사이에 존재하지 않습니다. 0: 전체공개, 1: 맞팔공개, 2: 비공개"})
  @Type(()=>Number)
  @Transform(({ value }) => value || 0)
  secretType?: number;

  @IsNumber()
  @Type(()=>Number)
  topicId?: number;

  @ArrayMaxSize(10, {message: '태그는 최대 10개까지 넣을 수 있습니다',})
  @Transform(({ value }) => value?.split(',') ?? [])
  tagNames?: string[];

  @IsNumber()
  @Type(()=>Number)
  loginedUserId?: number;

  static async factory(req: express.Request) : Promise<CreatePostDto> {
    const input = {
      ...req.body,
      postId: req.params.postId,
      userId: req.userInfo.id,
      cateId: req.body.categoryId,
      thumnail: req.body.thumnail === undefined ? req.file : "",
    }
    const dto = plainToClass(CreatePostDto, input);
    await validate(dto, {skipMissingProperties: true, validationError: { target: false }}).then(errors => {
      if (errors.length > 0) {
        throw { status: 400, message: errors[0].constraints };
      }
    });
    return dto;
  }
}

export class SearchPostDto {
  @IsNumber()
  @Type(()=>Number)
  postId?: number;

  @IsNumber()
  @Type(()=>Number)
  userId?: number;

  @IsNumber()
  @Type(()=>Number)
  cateId?: number;

  title?: string;
  tagName?: string;

  @IsNumber()
  @Type(()=>Number)
  topicId?: number;
  search?: string;

  @IsNumber()
  @Type(()=>Number)
  @Transform(({ value }) => value || 1)
  pageNumber?: number;

  @IsNumber()
  @Type(()=>Number)
  @Transform(({ value }) => value || 30)
  countPerPage?: number;

  @IsNumber()
  loginedUserId?: number;

  myFollowing?: string;
  onlyCount?: boolean;

  static async factory(req: express.Request): Promise<SearchPostDto> {
    const input = {
      ...req.query,
      cateId: req.query.categoryId,
      postId: req.params.id,
      pageNumber: req.query.pageNumber,
      countPerPage: req.query.countPerPage,
      loginedUserId: req.userInfo?.id,
    };
    const dto = plainToClass(SearchPostDto, input);
    await validate(dto, {skipMissingProperties: true, validationError: { target: false }}).then(errors => {
      if (errors.length > 0) {
        throw { status: 400, message: errors[0].constraints };
      }
    });
    return dto;
  }
}

export class UpdatePostDto {
  @IsNumber()
  @Type(()=>Number)
  postId?: number;

  title?: string;

  @IsNumber()
  @Type(()=>Number)
  userId?: number;

  @IsNumber()
  @Type(()=>Number)
  cateId?: number;

  content?: string;
  thumnail?: Express.Multer.File;
  thumbnailImgUrl?: string;

  @IsIn(enumToArray(OpenRange), {message: "secretType가 0~2 사이에 존재하지 않습니다. 0: 전체공개, 1: 맞팔공개, 2: 비공개"})
  @Type(()=>Number)
  secretType?: number;

  @IsNumber()
  @Type(()=>Number)
  topicId?: number;

  @Transform(({ value }) => value?.split(',') ?? [])
  tagNames?: string[];

  @IsNumber()
  @Type(()=>Number)
  loginedUserId?: number;

  static async factory(req: express.Request) : Promise<UpdatePostDto> {
    const input = {
      ...req.body,
      postId: req.params.id,
      userId: req.userInfo.id,
      cateId: req.body.categoryId,
      thumnail: req.body.thumnail === undefined ? req.file : "",
    }
    const dto = plainToClass(UpdatePostDto, input);
    await validate(dto, {skipMissingProperties: true, validationError: { target: false }}).then(errors => {
      if (errors.length > 0) {
        throw { status: 400, message: errors[0].constraints };
      }
    });
    return dto;
  }
}