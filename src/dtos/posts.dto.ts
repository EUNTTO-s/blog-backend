import express from 'express';
import {checkDataIsNotEmpty,} from '../utils/myutils'
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
export class CreatePostDto {
  postId?: number;

  @MinLength(1, {message: '제목은 최소 1글자 이상이여야 합니다',})
  @MaxLength(300, {message: '제목은 최대 300글자 이하이여야 합니다',})
  title?: string;

  @IsNumber()
  userId?: number;

  cateId?: number;

  @MinLength(1, {message: '내용은 최소 1글자 이상이여야 합니다.',})
  @MaxLength(1500, {message: '내용은 최대 1500글자 이하이여야 합니다',})
  content?: string;

  thumnail?: Express.Multer.File;
  thumbnailImgUrl?: string;

  @IsIn(enumToArray(OpenRange), {message: "secretType가 0~2 사이에 존재하지 않습니다. 0: 전체공개, 1: 맞팔공개, 2: 비공개"})
  secretType?: number;
  topicId?: number;

  @ArrayMaxSize(10, {message: '태그는 최대 10개까지 넣을 수 있습니다',})
  tagNames?: string[];

  loginedUserId?: number;

  constructor({title, userId, categoryId, content, thumnail, secretType, topicId, tagNames, postId, loginedUserId}: any) {
    checkDataIsNotEmpty({ title, content, topicId });
    this.postId = postId && +postId;
    this.title = title;
    this.userId = userId && +userId;
    this.cateId = categoryId && +categoryId;
    this.content = content;
    this.thumnail = thumnail;
    this.secretType = (secretType && +secretType) || 0;
    this.topicId = topicId && +topicId;
    this.tagNames = tagNames?.split(',') ?? [];
    this.loginedUserId = loginedUserId && +loginedUserId;
  }

  static async factory(req: express.Request) : Promise<CreatePostDto> {
    const input = {
      ...req.body,
      postId: req.params.postId,
      userId: req.userInfo.id,
      cateId: req.body.categoryId,
      thumnail: req.body.thumnail === undefined ? req.file : "",
    }
    const dto = new CreatePostDto(input);
    await validate(dto, {skipMissingProperties: true, validationError: { target: false }}).then(errors => {
      if (errors.length > 0) {
        throw { status: 400, message: errors[0].constraints };
      }
    });
    return dto;
  }
}

export class SearchPostDto {
  postId?: number;
  userId?: number;
  cateId?: number;
  title?: string;
  tagName?: string;
  topicId?: number;
  search?: string;
  pageNumber?: number;
  countPerPage?: number;
  loginedUserId?: number;
  myFollowing?: string;
  onlyCount?: boolean;

  constructor({
    postId,
    userId,
    cateId,
    title,
    topicId,
    search,
    pageNumber,
    countPerPage,
    loginedUserId,
    myFollowing,
    onlyCount,
  }: any) {
    this.postId = postId && +postId;
    this.title = title;
    this.userId = userId && +userId;
    this.cateId = cateId && +cateId;
    this.topicId = topicId && +topicId;
    this.search = search;
    this.pageNumber = pageNumber? +pageNumber : 1;
    this.countPerPage = countPerPage? +countPerPage : 30;
    this.loginedUserId = loginedUserId && +loginedUserId;
    this.myFollowing = myFollowing;
    this.onlyCount = onlyCount;
  }

  static factory(req: express.Request): SearchPostDto {
    const input = {
      ...req.query,
      cateId: req.query.categoryId,
      postId: req.params.id,
      pageNumber: req.query.pageNumber,
      countPerPage: req.query.countPerPage,
      loginedUserId: req.userInfo?.id,
    };
    return new SearchPostDto(input);
  }
}

export class UpdatePostDto {
  postId?: number;
  title?: string;
  userId?: number;
  cateId?: number;
  content?: string;
  thumnail?: Express.Multer.File;
  thumbnailImgUrl?: string;
  secretType?: number;
  topicId?: number;
  tagNames?: string[];
  loginedUserId?: number;

  constructor({title, userId, categoryId, content, thumnail, secretType, topicId, tagNames, postId, loginedUserId}: any) {
    this.postId = postId && +postId;
    this.title = title;
    this.userId = userId && +userId;
    this.cateId = categoryId && +categoryId;
    this.content = content;
    this.thumnail = thumnail;
    this.secretType = (secretType && +secretType) || 0;
    this.topicId = topicId && +topicId;
    this.tagNames = tagNames?.split(',') ?? [];
    this.loginedUserId = loginedUserId && +loginedUserId;

    if (this.secretType) {
      // 공개타입이 범위 내에 존재하는 지 확인
      const inRange = enumToArray(OpenRange).includes(Number(secretType));
      if (!inRange) {
        throw { status: 400, message: "secretType가 0~2 사이에 존재하지 않습니다. 0: 전체공개, 1: 맞팔공개, 2: 비공개" };
      }
    }
  }

  static factory(req: express.Request) : UpdatePostDto {
    const input = {
      ...req.body,
      postId: req.params.postId,
      userId: req.userInfo.id,
      cateId: req.body.categoryId,
      thumnail: req.body.thumnail === undefined ? req.file : "",
    }
    return new UpdatePostDto(input);
  }
}