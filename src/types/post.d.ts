interface PostInputType {
  postId?: number,
  title?: string,
  userId?: number,
  cateId?: number,
  content?: string,
  thumbnailImgUrl?: string,
  secretType?: string,
  topicId?: number,
  tagNames?: string[],
  thumnail?: Express.Multer.File,
}

interface PostSearchOption {
  postId?: number,
  userId?: number,
  categoryId?: number,
  tagName?: string,
  topicId?: number,
  search?: string,
  pageNumber?: number,
  countPerPage?: number,
  loginedUserId?: number,
  myFollowing?: string,
  onlyCount?: boolean,
}