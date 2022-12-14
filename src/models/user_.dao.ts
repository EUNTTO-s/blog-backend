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
    const [userInfo] = await dataSource
        .query(
            `
          SELECT
            users.id,
            users.username,
            users.email,
          JSON_OBJECT(
          'id',
          companies.id,
          'companyName',
          companies.company_name,
          'isCompanyMainMember',
          company_members.is_main_member
          ) AS company
          FROM
            companies
          JOIN company_members ON company_members.companies_id = companies.id
          JOIN users ON users.id = company_members.users_id
          WHERE
            users.id = ?
        `,
            [userId]
        )
        .then((users) => {
            return [...users].map((user) => {
                return { ...user, company: JSON.parse(user.company) };
            });
        });

    return userInfo as UserInfo;
};

// 회원 등급 판별
const checkGeneralUserRating = async (userId: number) => {
    const [generalUser] = await dataSource.query(
        `
        SELECT
          id,
          companies_id,
          users_id,
          is_main_member
        FROM
          company_members
        WHERE
          users_id = ?
      `,
        [userId]
    );

    return generalUser;
};

const checkMemberUserRating = async (userId: number) => {
    const [memberUser] = await dataSource.query(
        `
        SELECT
          companies.id,
          companies.company_name,
          company_members.users_id,
          company_residences.start_date,
          company_residences.end_date
        FROM
          companies
        JOIN company_members ON company_members.companies_id = companies.id
        JOIN company_residences ON company_residences.companies_id = companies.id
        WHERE
          start_date < now()
        AND
          end_date > now()
        AND
          users_id = ?
    `,
        [userId]
    );

    return memberUser;
};

export default {
    createUser,
    existUser,
    findUserByEmail,
    findUserById,
    checkGeneralUserRating,
    checkMemberUserRating,
};
