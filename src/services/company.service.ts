import companyDao from "../models/company.dao";

const getCompanies = async () => {
    return await companyDao.getCompanies({});
}

export default {
    getCompanies,
}