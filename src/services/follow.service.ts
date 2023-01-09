import dao_set from "../models";
const { followDao } = dao_set;

// 팔로우 하기
const followRequest = async (userId: string, targetUsersId: string) => {
    console.log(targetUsersId);
    const existFollow = await followDao.existFollow(userId, targetUsersId);
    if (existFollow) {
        throw { status: 409, message: "이미 팔로우 된 유저입니다." };
    }
    if (userId === targetUsersId) {
        throw { status: 409, message: "자신을 팔로우 할 수 없습니다." };
    }
    const createFollow = await followDao.createFollow(userId, targetUsersId);
    return createFollow;
};

// 언팔로우 하기
const unfollowRequest = async (userId: string, targetUsersId: string) => {
    const existFollow = await followDao.existFollow(userId, targetUsersId);
    if (!existFollow) {
        throw { status: 409, message: "팔로우, 팔로워 목록에 존재하지 않는 유저 입니다." };
    }
    const deleteFollow = await followDao.deleteFollow(userId, targetUsersId);
    return deleteFollow;
};

// 팔로워 리스트 보기
const getFollowingList = async (userId: string) => {
    const getList = await followDao.getFollowingList(userId);
    if (getList == false) {
        throw { status: 409, message: "팔로잉한 유저가 존재하지 않습니다." };
    }
    return getList;
};

const getFollowerList = async (userId: string) => {
    const getList = await followDao.getFollowerList(userId);
    if (getList == false) {
        throw { status: 409, message: "팔로워가 존재하지 않습니다." };
    }
    return getList;
};

export default {
    followRequest,
    unfollowRequest,
    getFollowingList,
    getFollowerList,
};
