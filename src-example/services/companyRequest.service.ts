import { companyRequestDao, companyDao } from "../models";

// 회사 요청 보내기
const createCompany = async (CompanyInput: CompanyRequestInput) => {
    const isExistCompany = await companyDao.getCompanies({ companyName: CompanyInput.companyName });
    if (isExistCompany) {
        throw { status: 400, message: "이미 등록된 회사 입니다." };
    }
    await companyRequestDao.createRequestCompany(CompanyInput);
};

// 회사 요청 리스트 확인
const getCompanyList = async () => {
    const companyList = await companyRequestDao.getCompanyList();
    return companyList;
};

// 회사 요청 승인
const approveCompany = async (companyName: string, startDate: string, endDate: string, userId: string, requestId: string) => {
    await companyDao.createCompany(companyName);
    const [getCompanyId] = await companyDao.getCompanyId(companyName);
    await companyDao.createCompanyMainMember(getCompanyId.id, userId);
    await companyDao.createCompanyResidences(getCompanyId.id, startDate, endDate);
    await companyRequestDao.refuseCompany(requestId);
};

// 회사 요청 거절
const refuseCompany = async (requestId: string) => {
    await companyRequestDao.refuseCompany(requestId);
};

export default {
    createCompany,
    getCompanyList,
    approveCompany,
    refuseCompany,
};
