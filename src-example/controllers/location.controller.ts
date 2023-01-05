import express from 'express';
import locationSvc from "../services/location.service"


const createLocation = async (req: express.Request, res: express.Response) => {
    const { locationName } = req.body;
    await locationSvc.createLocation(locationName);
    res.json({message: "CREATE_LOCATION"})
}

const getAllLocations = async (req: express.Request, res: express.Response) => {
    const result = await locationSvc.getAllLocations();
    res.json({data: result});
}

const updateLocation = async (req: express.Request, res: express.Response) => {
    const { locationId, locationName } = req.body;
    await locationSvc.updateLocation(locationId ,locationName);
    res.json({message: "UPDATE_LOCATION"})
}

const deleteLocation = async (req: express.Request, res: express.Response) => {
    const { locationId } = req.body;
    await locationSvc.deleteLocation(locationId);
    res.json({message: "DELETE_LOCATION"})
}

const createBranch = async (req: express.Request, res: express.Response) => {
    const { locationsId, branchName } = req.body;
    await locationSvc.createBranch(locationsId, branchName);
    res.json({message: "CREATE_BRANCH"})
}

const getAllBranches = async (req: express.Request, res: express.Response) => {
    const result = await locationSvc.getAllBranches();
    res.json({data: result});
}

const updateBranch = async (req: express.Request, res: express.Response) => {
    const { branchId, branchName } = req.body;
    await locationSvc.updateBranch(branchId, branchName);
    res.json({message: "UPDATE_BRANCH"})
}

const deleteBranch = async (req: express.Request, res: express.Response) => {
    const { branchId } = req.body;
    await locationSvc.deleteBranch(branchId);
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