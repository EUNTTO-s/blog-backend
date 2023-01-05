import dataSource from './database';

const getAllLocations = async () => {
    const result = await dataSource.query(`
        SELECT
            id,
            location_name AS locationName
        FROM
            locations
    `)
    return result as {id: number, locationName: string};
}

const createLocation = async(locationName: string) => {
    await dataSource.query(`
        INSERT INTO
            locations (location_name)
        VALUES
            (?)
    `, [locationName])
}

const updateLocation = async(locationId: number, locationName: string) => {
    await dataSource.query(`
        UPDATE locations
            SET location_name = ?
        WHERE
            id = ?
    `, [locationName, locationId])
}

const deleteLocation = async(locationsId: number) => {
    await dataSource.query(`
        DELETE FROM
            locations
        WHERE
            id = ?
    `, [locationsId])
}

const createBranch = async(locationsId: number, branchName: string) => {
    await dataSource.query(`
        INSERT INTO
            fastfive_branches (
                locations_id,
                branch_name
            )
        VALUES
            (?, ?)
    `, [locationsId, branchName])
}

const getAllBranches = async () => {
    const result = await dataSource.query(`
        SELECT
	        fastfive_branches.id,
            locations.location_name AS locationName,
            fastfive_branches.branch_name AS branchName
        FROM
	        locations
        JOIN fastfive_branches ON fastfive_branches.locations_id = locations.id
    `)
    return result as {id: number, locationName: string, branchName: string};
}


const updateBranch = async(branchId: number, branchName: string) => {
    await dataSource.query(`
        UPDATE fastfive_branches
            SET branch_name = ?
        WHERE
            id = ?
    `, [branchName, branchId])
}

const deleteBranch = async(branchId: number) => {
    await dataSource.query(`
        DELETE FROM
            fastfive_branches
        WHERE id = ?
    `, [branchId])
}

const findBranchById = async (branchId: number) => {
  const result = await dataSource.query(`
      SELECT
        fastfive_branches.id,
        locations.location_name AS locationName,
        fastfive_branches.branch_name AS branchName
      FROM
        locations
      JOIN fastfive_branches ON fastfive_branches.locations_id = locations.id
      WHERE
        fastfive_branches.id = ?
  `, [branchId])
  .then(list => {
    const [item] = list;
    return item;
  });
  return result;
}

export default {
    getAllLocations,
    getAllBranches,
    findBranchById,
    createLocation,
    updateLocation,
    deleteLocation,
    createBranch,
    updateBranch,
    deleteBranch,
}

