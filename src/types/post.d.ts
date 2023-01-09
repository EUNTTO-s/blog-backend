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
  tagNames?: string[],
  topicId?: string,
  secret_type?: number,
}