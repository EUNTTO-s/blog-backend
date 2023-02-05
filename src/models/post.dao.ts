import dataSource from "./database";
import {
  getQueryOfSelectPost,
  getQueryOfOpenRange,
  getQueryOfMyFollow,
} from "./builder/post.sql";
import { whereBuilder } from "./builder/queryBuilder";
import {CreatePostDto, SearchPostDto, UpdatePostDto} from '../dtos/posts.dto';
import { Post } from "./entities/post.entity"

const postRep = dataSource.getRepository(Post)

const createPosts = async (postInput: CreatePostDto) => {
  const post = Post.createInstance(postInput);
  return await postRep.save(post);
};

const getPosts = async (searchOption: SearchPostDto) => {
  const {
    postId,
    userId,
    cateId,
    topicId,
    search,
    countPerPage = 30,
    pageNumber = 1,
    loginedUserId,
    onlyCount = false,
  } = searchOption;
  let { myFollowing } = searchOption;
  if (myFollowing == "false") {
    myFollowing = undefined;
  }
  const answer = await dataSource
    .query(
      `
      ${getQueryOfSelectPost({ onlyCount })}
      ${whereBuilder("p.id",        ["="], postId, true)}
      ${whereBuilder("p.users_id",  ["="], userId)}
      ${whereBuilder("cate.id",     ["="], cateId)}
      ${whereBuilder("t.id",        ["="], topicId)}
      ${getQueryOfOpenRange(loginedUserId)}
      ${getQueryOfMyFollow(myFollowing)}
      ${whereBuilder("p.title",             ["LIKE", "AND", "SEARCH"], search)}
      ${whereBuilder("p.content",           ["LIKE", "OR",  "SEARCH"], search)}
      ${whereBuilder("cate.category_name",  ["LIKE", "OR",  "SEARCH"], search)}
      ${whereBuilder("tagsOnPost.tags",     ["LIKE", "OR",  "SEARCH"], search)}
      ORDER BY p.created_at DESC
      ${
        onlyCount == false?
          `LIMIT ${countPerPage} OFFSET ${countPerPage * (pageNumber - 1)}`
        :
          ``
      }
    `,
      [loginedUserId, loginedUserId, loginedUserId]
    )
    .then((answer) => {
      return [...answer].map((item) => {
        if (onlyCount) {
          return JSON.parse(item.maxCount);
        }
        return {
          ...item,
          category: JSON.parse(item.category),
          user: JSON.parse(item.user),
          topic: JSON.parse(item.topic),
          tags: JSON.parse(item.tags),
        }
    })
  });
  if (onlyCount) {
    return answer[0];
  }
  return answer;
};

const getMaxCountOfPosts = (searchOption: SearchPostDto) => {
  getPosts({ ...searchOption, onlyCount: true });
}

const deletePosts = async (postId: number) => {
  await postRep.delete({id: postId});
}

const updatePosts = async (postInput: UpdatePostDto) => {
  const post = Post.createInstance(postInput);
  await postRep.update({id: postInput.postId}, post);
};

export default {
  createPosts,
  getPosts,
  deletePosts,
  updatePosts,
  getMaxCountOfPosts,
};
