import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";

// 계정 생성
const createUser = async (nickname: string, email: string, hashed_password: string) => {
    await dataSource.query(
        `
        INSERT INTO
          users
          (nickname, email, password)
        VALUES
          (?, ?, ?);
      `,
        [nickname, email, hashed_password]
    );
};

// 메일(아이디) 중복
const existUser = async (email: string): Promise<UserInfo> => {
    const [user] = await dataSource.query(
        `
        SELECT
          id,
          email
        FROM
          users
        WHERE
          email = ?
      `,
        [email]
    );

    return user;
};

// 닉네임 중복
const existNickname = async (nickname: string): Promise<UserInfo> => {
    const [userName] = await dataSource.query(
        `
    SELECT
      id,
      nickname
    FROM
      users
    WHERE
      nickname = ?
    `,
        [nickname]
    );

    return userName;
};

// 유저 정보
const findUser = async (searchOption: UserSearchOption): Promise<UserInfo> => {
    let { userId, email, includePwd } = searchOption;
    const [userInfo] = await dataSource.query(
        `
          SELECT
            users.id,
            users.nickname,
            ${includePwd ? "users.password," : ""}
            users.email
          FROM
            users
          ${whereBuilder("users.id", userId, true)}
          ${whereBuilder("users.email", email)}
        `,
        [userId]
    );

    return userInfo as UserInfo;
};

export default {
    createUser,
    existUser,
    existNickname,
    findUser,
};
