import dao_set from "../models";
const { grassDao } = dao_set;

const getGrasses = async (searchInput: GrassSearchType) => {
    return await grassDao.getGrasses(searchInput);
}

export default {
    getGrasses,
}