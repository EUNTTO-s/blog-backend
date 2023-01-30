import dao_set from "../models";
import fileManger from "../middlewares/fileManager";
import {CreatePostDto, SearchPostDto, UpdatePostDto} from '../dtos/posts.dto';

const { postDao, postTagDao, tagDao, cateDao, topicDao } = dao_set;

const createPosts = async (input: CreatePostDto) => {
  const {
    cateId,
    userId,
    tagNames,
    thumnail,
    topicId,
  } = input;

  // 카테고리 유무 검사
  if (cateId) {
    const [cate] = await cateDao.getCategories({ userId, cateId });
    if (!cate) {
      throw { status: 400, message: "해당하는 카테고리가 존재하지 않습니다." };
    }
  }

  const [topic] = await topicDao.getTopics({ topicId });
  if (!topic) {
    throw { status: 400, message: "해당하는 토픽이 존재하지 않습니다." };
  }

  const post = await postDao.createPosts(input);
  const postId = post.insertId;

  if (tagNames) {
    updateTagOnPost(postId, tagNames);
  }

  const thumbnailImgUrl = await fileManger.updateFile("post", postId, thumnail);
  if (thumbnailImgUrl) {
    await postDao.updatePosts({postId, thumbnailImgUrl});
  }
  return { postId };
};

const getPosts = async (searchOption: SearchPostDto) => {
  const posts = await postDao.getPosts(searchOption);
  if (searchOption.postId) {
    return [posts, 1];
  }
  const maxCount = await postDao.getPosts({...searchOption, onlyCount: true});
  return [posts, maxCount];
}

const deletePosts = async (userId: number, postId: number) => {
  const [post] = await postDao.getPosts({userId, postId, loginedUserId: userId});
  if (!post) {
    throw { status: 400, message: "본인이 작성한 포스트가 아니거나 포스트가 존재하지 않습니다." };
  }
  await postTagDao.deletePostTags(postId);
  await postDao.deletePosts(postId);
}

const updatePosts = async (input: UpdatePostDto) => {
  const { userId, postId, tagNames, cateId, thumnail } = input;

  // 카테고리 정보 가져오기
  if (cateId) {
    const [cate] = await cateDao.getCategories({ userId, cateId });
    if (!cate) {
      throw { status: 400, message: "해당하는 카테고리가 존재하지 않습니다." };
    }
  }

  const [post] = await postDao.getPosts({userId, postId, loginedUserId: userId});
  if (!post) {
    throw { status: 400, message: "본인이 작성한 포스트가 아니거나 포스트가 존재하지 않습니다." };
  }

  const thumbnailImgUrl = await fileManger.updateFile("post", postId, thumnail);
  await postDao.updatePosts({...input, thumbnailImgUrl});

  if (tagNames != undefined) {
    updateTagOnPost(post.id, tagNames);
  }
}

const updateTagOnPost = async (postId: number, tagNames: string[]) => {
  // 기존 태그 삭제
  await postTagDao.deletePostTags(postId);

  const trimedTagNames = tagNames
    .filter(v => v != "")
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .map(v =>(v.trim()));

  // 새로운 태그 생성 및 포스트와 태그 연결
  trimedTagNames.forEach(async (tagName) => {
    let [tag] = await tagDao.getTags(tagName);
    if (!tag) {
      tag = await tagDao.createTags(tagName);
    }
    tag.id = tag.id || tag.insertId;
    await postTagDao.createPostTags(postId, tag.id);
  })
}

export default {
  createPosts,
  getPosts,
  deletePosts,
  updatePosts,
};
