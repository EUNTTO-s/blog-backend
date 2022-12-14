import dataSource from "./database";

// 계정 생성
const createUser = async (username: string, email: string, hashed_password: string) => {
    await dataSource.query(
        `
        INSERT INTO
          users
          (username, email, password)
        VALUES
          (?, ?, ?);
      `,
        [username, email, hashed_password]
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

// 유저 존재 확인 체크
const findUserByEmail = async (email: string): Promise<UserInfo> => {
    const [userInfo] = await dataSource.query(
        `
          SELECT
            id,
            password
          FROM
            users
          WHERE
            email = ?
        `,
        [email]
    );

    return userInfo as UserInfo;
};

// 유저 정보
const findUserById = async (userId: number): Promise<UserInfo> => {
    const [userInfo] = await dataSource.query(
        `
          SELECT
            id,
            email,
            username
          FROM
            users
          WHERE
            id = ?
        `,
        [userId]
    );

    return userInfo as UserInfo;
};

export default {
    createUser,
    existUser,
    findUserByEmail,
    findUserById,
};
