import dataSource from './database';

const getAllCategories = async () : Promise<any> => {
    const result = await dataSource.query(`
        SELECT
            *
        FROM
            level_1_categories
    `);
    return result;
}

export default {
    getAllCategories
}