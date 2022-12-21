import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";

const createCompany = async (companyName: string) => {
    await dataSource.query(
        `
        INSERT INTO
          companies
          (company_name)
        VALUES
          (?)
        `,
        [companyName]
    );
};

const getCompanyId = async (companyName: string) => {
    const companyId = await dataSource.query(
        `
        SELECT
          id
        FROM
          companies
        WHERE
          company_name = ?
        `,
        [companyName]
    );
    return companyId;
};

const createCompanyMainMember = async (companyId: string, userId: string) => {
    await dataSource.query(
        `
        INSERT INTO
          company_members
          (companies_id, users_id, is_main_member)
        VALUES
          (?, ?, ?)
        `,
        [companyId, userId, 1]
    );
};

const createCompanyMember = async (companyId: string, userId: string) => {
    await dataSource.query(
        `
      INSERT INTO
        company_members
        (companies_id, users_id, is_main_member)
      VALUES
        (?, ?, ?)
      `,
        [companyId, userId, 0]
    );
};

const createCompanyResidences = async (companyId: string, startDate: string, endDate: string) => {
    await dataSource.query(
        `
        INSERT INTO
          company_residences
          (companies_id, start_date, end_date)
        VALUES
          (?, ?, ?)
        `,
        [companyId, startDate, endDate]
    );
};

const getCompanies = async (searchOption: CompanySerarchOption) => {
    if (!searchOption) searchOption = {};
    let limit = 100;
    let { id, companyName } = searchOption;
    const query = `
    SELECT
      id,
      company_name
    FROM
      companies
    ${whereBuilder("id", id, true)}
    ${whereBuilder("company_name", companyName)}
    LIMIT ${limit}
    `;
    return await dataSource.query(query).then((list) => {
        if (companyName || id) {
            let [item] = list;
            return item;
        }
        return list;
    });
};

export default {
    createCompany,
    getCompanyId,
    createCompanyMainMember,
    createCompanyMember,
    createCompanyResidences,
    getCompanies,
};
