import daoset from "../models";
const { memberRequestDao, companyDao } = daoset;

// 멤버 요청 보내기
const createMember = async (MemberInput: MemberRequestInput) => {
    const isExistCompany = await companyDao.getCompanies({ id: MemberInput.companiesId });
    if (!isExistCompany) {
        throw { status: 404, message: "등록되지 않은 회사입니다." };
    }

    await memberRequestDao.createMember(MemberInput);
};

// 멤버 요청 리스트 확인
const getMemberList = async (MemberInput: MemberRequestInput) => {
    // 대표 멤버 판단
    const isMainMember = await memberRequestDao.isMainMember(MemberInput.userId);
    if (!isMainMember) {
        throw { status: 403, message: "접근 권한이 없습니다." };
    }
    const memberList = await memberRequestDao.getMemberList(MemberInput.userId);
    return memberList;
};

// 멤버 요청 승인
const approveMember = async (companyId: string, userId: string) => {
    await companyDao.createCompanyMember(companyId, userId);
};

// 멤버 요청 거절
const refuseMember = async (requestId: string) => {
    await memberRequestDao.refuseMember(requestId);
};

export default {
    createMember,
    getMemberList,
    approveMember,
    refuseMember,
};
