import locationDao from "../models/location.dao";

const createLocation = async (locationName: string) => {
    await locationDao.createLocation(locationName);
}
const getAllLocations = async () => {
    const result = await locationDao.getAllLocations();
    return result;
}

const updateLocation = async (locationId: number,locationName: string) => {
    await locationDao.updateLocation(locationId, locationName);
}

const deleteLocation = async (locationId: number) => {
    await locationDao.deleteLocation(locationId);
}

const createBranch = async (locationId: number, branchName: string) => {
    await locationDao.createBranch(locationId, branchName);
}
const getAllBranches = async () => {
    const result = await locationDao.getAllBranches();
    return result;
}

const updateBranch = async (branchId: number, branchName: string) => {
    await locationDao.updateBranch(branchId, branchName);
}

const deleteBranch = async (branchId: number) => {
    await locationDao.deleteBranch(branchId);
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