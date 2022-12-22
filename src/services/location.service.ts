import locationDao from "../models/location.dao";

const createLocation = async (location_name: string) => {
    await locationDao.createLocation(location_name);
}
const getAllLocations = async () => {
    const result = await locationDao.getAllLocations();
    return result;
}

const updateLocation = async (locationId: number,location_name: string) => {
    await locationDao.updateLocation(locationId, location_name);
}

const deleteLocation = async (locationId: number) => {
    await locationDao.deleteLocation(locationId);
}

const createBranch = async (locations_id: number, branch_name: string) => {
    await locationDao.createBranch(locations_id, branch_name);
}
const getAllBranches = async () => {
    const result = await locationDao.getAllBranches();
    return result;
}

const updateBranch = async (branch_Id: number, branch_name: string) => {
    await locationDao.updateBranch(branch_Id, branch_name);
}

const deleteBranch = async (branch_Id: number) => {
    await locationDao.deleteBranch(branch_Id);
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