import { DataSource } from 'typeorm';
import { Post } from "./entities/post.entity"
import { UserUrl } from "./entities/url.entity"
const dataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Post, UserUrl],
});

function handleDisconnect() {
  dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    })
    .catch(() => {
      console.log("try re-connecting...");
      setTimeout(handleDisconnect, 2000);
    });
}
handleDisconnect();

const postRep = dataSource.getRepository(Post);

export default dataSource;
export {postRep};