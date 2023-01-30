import {Request, Response} from 'express';
import service_set from "../services";
const { postSvc } = service_set;
import {CreatePostDto, SearchPostDto, UpdatePostDto} from '../dtos/posts.dto';

const createPosts = async (req: Request, res: Response) => {
  const postDto = CreatePostDto.factory(req);
  const result = await postSvc.createPosts(postDto);
  res.status(200).json({message: 'POST_CREATED', data: result});
}

const getPosts = async (req: Request, res: Response) => {
  const postDto = SearchPostDto.factory(req);
  const [posts, maxCount] = await postSvc.getPosts(postDto);
  const {pageNumber, countPerPage} = postDto;
  let resData:any = { data: postDto.postId ? posts[0] : posts };
  if (!postDto.postId) {
    resData = {...resData, maxCount, pageNumber, maxPage: Math.floor(maxCount/countPerPage) + 1};
  }
  res.status(200).json(resData);
}

const deletePosts = async (req: Request, res: Response) => {
  const { id: postId } = req.params;
  await postSvc.deletePosts(+req.userInfo.id, +postId);
  res.status(200).json({message: 'POST_DELETED'});
}

const updatePosts = async (req: Request, res: Response) => {
  const postDto = UpdatePostDto.factory(req);
  await postSvc.updatePosts(postDto);
  res.status(200).json({message: 'POST_UPDATED'});
}

export default {
  createPosts,
  getPosts,
  deletePosts,
  updatePosts,
}