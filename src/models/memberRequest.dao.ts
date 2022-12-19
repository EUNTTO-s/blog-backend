import dataSource from "./database";

// 멤버 요청 보내기
const createMember = async (MemberInput: MemberRequestInput) => {
    await dataSource.query(
        `
        INSERT INTO
          member_join_request
          (users_id, companies_id)
        VALUES
          (?, ?)
        `,
        [MemberInput.userId, MemberInput.companiesId]
    );
};

// 대표 멤버 판단
const isMainMember = async (userId: string) => {
    const [checkMainMember] = await dataSource.query(
        `
        SELECT
          companies_id,
          users_id,
          is_main_member
        FROM
          company_members
        WHERE
          is_main_member = 1
        AND
          users_id = ?
      `,
        [userId]
    );
    return checkMainMember;
};

// 멤버 요청 리스트 확인
const getMemberList = async (userId: string) => {
    const memberList = await dataSource
        .query(
            `
        SELECT
          member_join_request.id,
          member_join_request.users_id AS usersId,
          users.username,
          users.email,
          JSON_OBJECT(
          'id',
          company_members.companies_id,
          'companyName',
          companies.company_name
          ) AS company
        FROM
          member_join_request
        JOIN
        users
        ON users.id = member_join_request.users_id
        JOIN
        company_members
        ON company_members.companies_id = member_join_request.companies_id
        JOIN
        companies
        ON companies.id = member_join_request.companies_id
        WHERE
          company_members.users_id = ?

        `,
            [userId]
        )
        .then((lists) => {
            return [...lists].map((list) => {
                return { ...list, company: JSON.parse(list.company) };
            });
        });
    return memberList;
};

// 멤버 요청 리스트 삭제
const refuseMember = async (requestId: string) => {
    await dataSource.query(
        `
      DELETE FROM
        member_join_request
      WHERE
        id = ?
    
      `,
        [requestId]
    );
};

export default {
    createMember,
    isMainMember,
    getMemberList,
    refuseMember,
};
