interface PostInputType {
  postId?: string,
  title?: string
  userId?: string;
  cateId?: string;
  content?: string;
  thumnailImgUrl?: string;
  secretType?: string;
  topicId?: string;
  tagNames?: string[];
}

interface PostSearchOption {
  postId?: string,
  userId?: string,
  categoryId?: string,
  tagNames?: string[],
  topicId?: string,
  secret_type?: number,
}