import dataSource from './database';

const getAllLocations = async () : Promise<any> => {
    const result = await dataSource.query(`
        SELECT
            *
        FROM
            locations
    `) 
    return result;
}

const getAllBranches = async () : Promise<any> => {
    const result = await dataSource.query(`
        SELECT
	        fastfive_branches.id,
            locations.location_name,
            fastfive_branches.branch_name
        FROM
	        locations
        JOIN fastfive_branches ON fastfive_branches.locations_id = locations.id;
    `) 
    return result;
}

export default {
    getAllLocations,
    getAllBranches
}