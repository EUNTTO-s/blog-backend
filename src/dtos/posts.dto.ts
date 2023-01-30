import express from 'express';
import {checkDataIsNotEmpty,} from '../utils/myutils'
import { OpenRange } from "../types/post.types";
import { enumToArray } from "../utils/myutils";

export class CreatePostDto {
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

    // title 길이 검사
    if (this.title.length > 300) {
      throw { status: 400, message: "제목은 300자 이상 적을 수 없습니다." };
    }

    // content 길이 검사
    if (this.content.length > 1500) {
      throw { status: 400, message: "내용은 1500자 이상 적을 수 없습니다." };
    }

    // 태그 개수 제한 검사
    if (tagNames.length > 10) {
      throw { status: 400, message: "태그는 10개를 초과할 수 없습니다." };
    }

    // 공개타입이 범위 내에 존재하는 지 확인
    const inRange = enumToArray(OpenRange).includes(Number(secretType));
    if (!inRange) {
      throw { status: 400, message: "secretType가 0~2 사이에 존재하지 않습니다. 0: 전체공개, 1: 맞팔공개, 2: 비공개" };
    }
  }

  static factory(req: express.Request) : CreatePostDto {
    const input = {
      ...req.body,
      postId: req.params.postId,
      userId: req.userInfo.id,
      cateId: req.body.categoryId,
      thumnail: req.body.thumnail === undefined ? req.file : "",
    }
    return new CreatePostDto(input);
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