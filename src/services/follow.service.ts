import dao_set from "../models";
const { followDao } = dao_set;

// 팔로우 하기
const folllowRequest = async (userId: string, target_users_id: string) => {
    const existFollow = await followDao.existFollow(userId, target_users_id);
    if (existFollow) {
        throw { status: 404, message: "이미 팔로우 된 유저입니다." };
    }
    const createFollow = await followDao.createFollow(userId, target_users_id);
    return createFollow;
};

// 언팔로우 하기
const unfolllowRequest = async (followId: string) => {
    const deleteFollow = await followDao.deleteFollow(followId);
    return deleteFollow;
};

// 팔로우 리스트 보기
const findFollowList = async (userId: string) => {
    const findList = await followDao.findFollowList(userId);
    return findList;
};

export default {
    folllowRequest,
    unfolllowRequest,
    findFollowList,
};
