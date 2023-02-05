import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"
import { CreatePostDto, UpdatePostDto } from "../../dtos/posts.dto";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "users_id" })
  userId: number;

  @Column("int", { name: "categories_id", nullable: true })
  cateId: number;

  @Column("int", { name: "topics_id" })
  topicId: number;

  @Column("varchar", { name: "title", length: 300 })
  title: string;

  @Column("varchar", { name: "content", length: 1500 })
  content: string;

  @Column("varchar", { name: "thumnail_img_url", length: 1000, nullable: true })
  thumbnailImgUrl: string;

  @Column("tinyint", { name: "secret_type", default: 0 })
  secretType: number;

  static createInstance(dto :CreatePostDto | UpdatePostDto) {
    const { title, userId, cateId, content, secretType, topicId, thumbnailImgUrl } = dto;
    const post = new Post()
    post.userId = userId
    post.cateId = cateId
    post.topicId = topicId
    post.title = title
    post.content = content
    post.thumbnailImgUrl = thumbnailImgUrl
    post.secretType = secretType
    return post;
  }
}