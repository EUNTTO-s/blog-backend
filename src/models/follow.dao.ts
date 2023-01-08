import dataSource from "./database";

// 팔로우 하기
const createFollow = async (userId: string, target_users_id: string) => {
    await dataSource.query(
        `
          INSERT INTO
            follow
            (users_id, target_users_id)
          VALUES
            (?, ?);
        `,
        [userId, target_users_id]
    );
};

// 팔로우 존재 여부
const existFollow = async (userId: string, target_users_id: string) => {
    const [findList] = await dataSource.query(
        `
        SELECT
          id,
          target_users_id
        FROM
          follow
        WHERE
          users_id = ?
        AND
          target_users_id = ?
      `,
        [userId, target_users_id]
    );
    return findList;
};

// 언팔로우 하기
const deleteFollow = async (followId: string) => {
    await dataSource.query(
        `
          DELETE FROM
            follow
          WHERE
            id = ?
        `,
        [followId]
    );
};

// 팔로우 리스트 보기
const findFollowList = async (userId: string) => {
    const findList = await dataSource.query(
        `
          SELECT
            id AS followId,
            target_users_id AS targetUsersId
          FROM
            follow
          WHERE
            users_id = ?
        `,
        [userId]
    );
    return findList;
};

export default {
    createFollow,
    existFollow,
    deleteFollow,
    findFollowList,
};
