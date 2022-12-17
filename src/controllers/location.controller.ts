import express from 'express';
import locationSvc from "../services/location.service"


const createLocation = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { location_name } = req.body;
    await locationSvc.createLocation(Number(userId), location_name);
    res.json({message: "CREATE_LOCATION"})
}

const getAllLocations = async (req: express.Request, res: express.Response) => {
    const result = await locationSvc.getAllLocations();
    res.json({data: result});
}

const updateLocation = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { locationId, location_name } = req.body;
    await locationSvc.updateLocation(Number(userId), locationId ,location_name);
    res.json({message: "UPDATE_LOCATION"})
}

const deleteLocation = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { locationId } = req.body;
    await locationSvc.deleteLocation(Number(userId), locationId);
    res.json({message: "DELETE_LOCATION"})
}

const createBranch = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { locations_id, branch_name } = req.body;
    await locationSvc.createBranch(Number(userId), locations_id, branch_name);
    res.json({message: "CREATE_BRANCH"})
}

const getAllBranches = async (req: express.Request, res: express.Response) => {
    const result = await locationSvc.getAllBranches();
    res.json({data: result});
}

const updateBranch = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { branch_Id, branch_name } = req.body;
    await locationSvc.updateBranch(Number(userId), branch_Id, branch_name);
    res.json({message: "UPDATE_BRANCH"})
}

const deleteBranch = async (req: express.Request, res: express.Response) => {
    const userId = req.userInfo.id;
    const { branch_Id } = req.body;
    await locationSvc.deleteBranch(Number(userId), branch_Id);
    res.json({message: "DELETE_BRANCH"})
}

export default {
    createLocation,
    getAllLocations,
    updateLocation,
    deleteLocation,
    createBranch,
    getAllBranches,
    updateBranch,
    deleteBranch
}