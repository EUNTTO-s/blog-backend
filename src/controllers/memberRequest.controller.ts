import express from "express";
import service_set from "../services/index";
const { memberRequestSvc } = service_set;
import { checkDataIsNotEmpty } from "../utils/myutils";

// 멤버 요청 보내기
const createMember = async (req: express.Request, res: express.Response) => {
    const { companiesId }: MemberRequestInput = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId, companiesId });

    await memberRequestSvc.createMember({ userId, companiesId });
    res.status(201).json({ message: "REQUEST_SUCCESSFULLY" });
};

// 멤버 요청 리스트 확인
const getMemberList = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ userId });
    const memberList = await memberRequestSvc.getMemberList({ userId });
    res.status(200).json({ memberList: memberList });
};

// 멤버 요청 승인
const approveMember = async (req: express.Request, res: express.Response) => {
    const { companyId }: CompanyRequestInput = req.body;
    const userId = req.userInfo.id;
    checkDataIsNotEmpty({ companyId, userId });

    await memberRequestSvc.approveMember(companyId, userId);
    res.status(201).json({ message: "APPROVE_SUCCESSFULLY" });
};
// 멤버 요청 거절
const refuseMember = async (req: express.Request, res: express.Response) => {
    const { requestId } = req.body;
    checkDataIsNotEmpty({ requestId });

    await memberRequestSvc.refuseMember(requestId);
    res.status(200).json({ message: "REFUSE_SUCCESSFULLY" });
};

export default {
    createMember,
    getMemberList,
    approveMember,
    refuseMember,
};
