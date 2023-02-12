import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("urls")
export class UserUrl extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "users_id" })
  userId: number;

  @Column("varchar", { name: "title", length: 150})
  title: string;

  @Column("varchar", { name: "url", length: 500, nullable: true })
  url: string;

  static createInstance(dto : {userId: number, title: string, url: string}) {
    const userUrl = new UserUrl()
    userUrl.userId = dto.userId;
    userUrl.title = dto.title;
    userUrl.url = dto.url;
    return userUrl;
  }
}