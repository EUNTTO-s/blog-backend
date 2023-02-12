import { UserUrl } from "./entities/url.entity"
import dataSource from "./database";
const urlRep = dataSource.getRepository(UserUrl)

const deleteUrls = async (urlInput: {userId: number}) => {
  return await urlRep.delete({userId: urlInput.userId});
};

const createUrls = async (urlInput: {userId: number, title: string, url: string}) => {
  const url = UserUrl.createInstance(urlInput);
  return await urlRep.save(url);
};

export default {
  createUrls,
  deleteUrls,
};
