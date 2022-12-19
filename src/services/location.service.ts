import locationDao from "../models/location.dao";

const createLocation = async (userId: number, location_name: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await locationDao.createLocation(location_name);
}
const getAllLocations = async () => {
    const result = await locationDao.getAllLocations();
    return result;
}

const updateLocation = async (userId: number, locationId: number,location_name: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await locationDao.updateLocation(locationId, location_name);
}

const deleteLocation = async (userId: number, locationId: number) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await locationDao.deleteLocation(locationId);
}

const createBranch = async (userId: number, locations_id: number, branch_name: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await locationDao.createBranch(locations_id, branch_name);
}
const getAllBranches = async () => {
    const result = await locationDao.getAllBranches();
    return result;
}

const updateBranch = async (userId: number, branch_Id: number, branch_name: string) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
    await locationDao.updateBranch(branch_Id, branch_name);
}

const deleteBranch = async (userId: number, branch_Id: number) => {
    if (userId !== 1) {
        throw {status: 400, message: "권한이 없습니다"}
    }
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