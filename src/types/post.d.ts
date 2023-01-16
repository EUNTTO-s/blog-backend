interface PostInputType {
  postId?: string,
  title?: string,
  userId?: string,
  cateId?: string,
  content?: string,
  thumnailImgUrl?: string,
  secretType?: string,
  topicId?: string,
  tagNames?: string[],
  thumnail?: Express.Multer.File,
}

interface PostSearchOption {
  postId?: string,
  userId?: string,
  categoryId?: string,
  tagName?: string,
  topicId?: string,
  search?: string,
  pageNumber?: number,
  countPerPage?: number,
  loginedUserId?: string,
  myFollowing?: string,
}