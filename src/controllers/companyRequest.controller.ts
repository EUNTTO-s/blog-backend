import express from "express";
import service_set from "../services/index";
const { companyRequestSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 회사 요청 보내기
const createCompany = async (req: express.Request, res: express.Response) => {
    const { companyName, startDate, endDate }: CompanyRequestInput = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, companyName, startDate, endDate });

    await companyRequestSvc.createCompany({ userId, companyName, startDate, endDate });
    res.status(201).json({ message: "REQUEST_SUCCESSFULLY" });
};

// 회사 요청 리스트 확인
const getCompanyList = async (req: express.Request, res: express.Response) => {
    const companyList = await companyRequestSvc.getCompanyList();
    res.status(200).json({ companyList: companyList });
};

// 회사 요청 승인
const approveCompany = async (req: express.Request, res: express.Response) => {
    const { companyName, startDate, endDate, userId, requestId }: CompanyRequestInput = req.body;
    checkDataIsNotEmpty({ companyName, startDate, endDate, userId, requestId });

    await companyRequestSvc.approveCompany(companyName, startDate, endDate, userId, requestId);
    res.status(201).json({ message: "APPROVE_SUCCESSFULLY" });
};
// 회사 요청 거절
const refuseCompany = async (req: express.Request, res: express.Response) => {
    const { requestId } = req.body;
    checkDataIsNotEmpty({ requestId });

    await companyRequestSvc.refuseCompany(requestId);
    res.status(200).json({ message: "REFUSE_SUCCESSFULLY" });
};

export default {
    createCompany,
    getCompanyList,
    approveCompany,
    refuseCompany,
};
