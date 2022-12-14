import dataSource from './database';
import {whereBuilder} from './builder/queryBuilder'

const createCompany = async (companyName: string) => {
  return await dataSource.query(
    `
    INSERT INTO companies(
      company_name
      )
    VALUES(?)
    `,
    [companyName]
  );
}

const getCompanies = async (searchOption: CompanySerarchOption) => {
  if (!searchOption)
    searchOption = {};
  let limit = 20;
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
  return await dataSource.query(
    query).then(list => {
      if (companyName || id) {
        let [item] = list;
        return item;
      }
      return list;
    });
}

export default {
  createCompany,
  getCompanies,
}