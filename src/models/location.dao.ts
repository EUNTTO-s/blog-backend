import dataSource from './database';

const getAllLocations = async () => {
    const result = await dataSource.query(`
        SELECT
            id,
            location_name
        FROM
            locations
    `)
    return result as {id: number, location_name: string};
}

const createLocation = async(location_name: string) => {
    await dataSource.query(`
        INSERT INTO
            locations (location_name)
        VALUES
            (?)
    `, [location_name])
}

const updateLocation = async(locationId: number, location_name: string) => {
    await dataSource.query(`
        UPDATE locations
            SET location_name = ?
        WHERE
            id = ?
    `, [location_name, locationId])
}

const deleteLocation = async(locations_Id: number) => {
    await dataSource.query(`
        DELETE FROM
            locations
        WHERE
            id = ?
    `, [locations_Id])
}

const createBranch = async(locations_Id: number, branch_name: string) => {
    await dataSource.query(`
        INSERT INTO
            fastfive_branches (
                locations_id,
                branch_name
            )
        VALUES
            (?, ?)
    `, [locations_Id, branch_name])
}

const getAllBranches = async () => {
    const result = await dataSource.query(`
        SELECT
	        fastfive_branches.id,
            locations.location_name,
            fastfive_branches.branch_name
        FROM
	        locations
        JOIN fastfive_branches ON fastfive_branches.locations_id = locations.id
    `)
    return result as {id: number, location_name: string, branch_name: string};
}


const updateBranch = async(branch_Id: number, branch_name: string) => {
    await dataSource.query(`
        UPDATE fastfive_branches
            SET branch_name = ?
        WHERE
            id = ?
    `, [branch_name, branch_Id])
}

const deleteBranch = async(branch_Id: number) => {
    await dataSource.query(`
        DELETE FROM
            fastfive_branches
        WHERE id = ?
    `, [branch_Id])
}

const findBranchById = async (branchId: number) => {
  const result = await dataSource.query(`
      SELECT
        fastfive_branches.id,
        locations.location_name,
        fastfive_branches.branch_name
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

