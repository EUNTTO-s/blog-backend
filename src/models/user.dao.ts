import dataSource from "./database";
import { whereBuilder, setBuilder } from "./builder/queryBuilder";
import {domain} from "./common";

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

// 프로필 업데이트
const updateProfile = async (input: ProfileInputType) => {
    const propertyArray: [string, string, boolean?][] = [
        ["nickname", input.nickname],
        ["blog_title", input.blogTitle],
        ["profile_intro", input.profileIntro],
        ["profile_img_url", input.profileImgUrl, true],
    ];
    const [stateOfSet, filterdValueArr] = setBuilder(propertyArray);
    const profile = await dataSource.query(
        `
          UPDATE
            users
          SET
            ${stateOfSet}
          WHERE
            id = ?
        `,
        [...filterdValueArr, input.userId]
    );
    return profile;
};

// 유저 정보
const findUsers = async (searchOption: UserSearchOption): Promise<UserInfo[]> => {
    let { userId, email, includePwd, search } = searchOption;
    const userInfos = await dataSource
        .query(
            `
          SELECT
            users.id,
            users.nickname,
            ${includePwd ? "users.password," : ""}
            users.email,
            JSON_OBJECT(
              'blogTitle',
              users.blog_title,
              'profileIntro',
              users.profile_intro,
              'profileImgUrl',
              users.profile_img_url
            ) AS profile,
            users.created_at AS startDate
          FROM
            users
          ${whereBuilder("users.id", ["="], userId, true)}
          ${whereBuilder("users.email", ["="], email)}
          ${whereBuilder("users.nickname", ["LIKE", "AND", "SEARCH"], search)}
        `,
            [userId]
        )
        .then((users) => {
            return [...users].map((user) => {
                let profile = JSON.parse(user.profile);
                let profileImgUrl = profile.profileImgUrl
                  ?
                    `${domain}${profile.profileImgUrl}`
                  :
                    `${domain}/user/default-img.png`
                return {
                  ...user,
                  profile: { ...profile, profileImgUrl },
                };
            });
        });

    return userInfos;
};

export default {
    createUser,
    existUser,
    existNickname,
    updateProfile,
    findUsers,
};
