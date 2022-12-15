import dataSource from './database';

const getAllCategories = async () => {
    const result = await dataSource.query(`
        SELECT
            id,
            img_url,
            category_name,
            description
        FROM
            level_1_categories
    `);
    return result as {id: number, img_url: string, category_name: string, description: string};
}

const findlv1CategoryById = async (categoryId: number) => {
    const [result] = await dataSource.query(`
        SELECT
            id,
            img_url,
            category_name,
            description
        FROM
            level_1_categories
        WHERE
            id = ?
    `, [categoryId])
    return result as {id: number, img_url: string, category_name: string, description: string};
}

const findlv2CategoryById = async (categoryId: number) => {
  const [result] = await dataSource.query(`
      SELECT
        id,
        level_1_categories_id,
        category_name,
        description
      FROM
        level_2_categories
      WHERE
        id = ?
  `, [categoryId]);
  return result;
}

export default {
    getAllCategories,
    findlv1CategoryById,
    findlv2CategoryById,
}

