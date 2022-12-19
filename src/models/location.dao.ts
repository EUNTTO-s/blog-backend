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
    findBranchById
}

