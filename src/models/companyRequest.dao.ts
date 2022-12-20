import dataSource from "./database";

// 회사 요청 보내기
const createRequestCompany = async (CompanyInput: CompanyRequestInput) => {
    await dataSource.query(
        `
          INSERT INTO
            company_request
            (users_id, company_name, start_date, end_date)
          VALUES
            (?, ?, ?, ?)
      `,
        [CompanyInput.userId, CompanyInput.companyName, CompanyInput.startDate, CompanyInput.endDate]
    );
};

// 회사 요청 리스트 확인
const getCompanyList = async () => {
    const companyList = await dataSource.query(
        `
          SELECT
            company_request.id,
            company_request.users_id AS usersId,
            company_request.company_name AS companyName,
            DATE_FORMAT(start_date, '%Y-%m-%d') AS startDate,
            DATE_FORMAT(end_date, '%Y-%m-%d') AS endDate
          FROM
            company_request
        `
    );
    return companyList;
};

// 회사 요청 리스트 삭제
const refuseCompany = async (requestId: string) => {
    await dataSource.query(
        `
        DELETE FROM
          company_request
        WHERE
          id = ?
      
        `,
        [requestId]
    );
};

export default {
    createRequestCompany,
    getCompanyList,
    refuseCompany,
};
