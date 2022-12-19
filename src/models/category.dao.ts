import dataSource from './database';

const getAllCategories = async () => {
    const result = await dataSource.query(`
    SELECT
	    level_1_categories.id,
        level_1_categories.category_name as category,
        JSON_ARRAYAGG
            (JSON_OBJECT
                ("id",level_2_categories.id, "category", level_2_categories.category_name)) as subCategory
    FROM
	    level_1_categories
    JOIN level_2_categories ON level_2_categories.level_1_categories_id = level_1_categories.id
    GROUP BY level_1_categories.id, level_1_categories.category_name
    `);
    return result as {id: number, category: string};
}

const findCategoryById = async (categoryId: number) => {
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
    `, [categoryId]);
    return result as {id: number, img_url: string, category_name: string, description: string};
}

const createCategory = async(img_url: string, category_name: string, description: string) => {
    await dataSource.query(`
        INSERT INTO
            level_1_categories (
                img_url,
                category_name,
                description)
        VALUES
            (?, ?, ?)
    `, [img_url, category_name, description]);
}

const updateCategory = async(categoryId: number, category_name?: string, description?: string) => {
    category_name ? await dataSource.query(`
        UPDATE level_1_categories
            SET category_name = ?
        WHERE
            id = ?
    `, [category_name, categoryId]) : ''
    description ? await dataSource.query(`
        UPDATE level_1_categories
            SET description = ?
        WHERE
            id = ?
    `, [description, categoryId]) : ''
}

const deleteCategory = async(categoryId: number) => {
    await dataSource.query(`
        DELETE
            FROM level_1_categories
        WHERE
            id = ?
    `, [categoryId])
}

const updateCategoryImg = async(img_url:string, categoryId: number) => {
    await dataSource.query(`
        UPDATE level_1_categories
            SET level_1_categories.img_url = ?
        WHERE
            level_1_cateogories.id = ?
    `, [img_url, categoryId])
}

const createLevel_2_Category = async(level_1_categories_id: number, category_name: string, description: string) => {
    await dataSource.query(`
        INSERT INTO
            level_2_categories (
                level_1_categories_id,
                category_name,
                description)
        VALUES
            (?, ?, ?)
    `, [level_1_categories_id, category_name, description]);
}

const updateLevel_2_Category = async(categoryId: number, category_name?: string, description?: string) => {
    category_name ? await dataSource.query(`
        UPDATE level_2_categories
            SET category_name = ?
        WHERE
            id = ?
    `, [category_name, categoryId]) : ''
    description ? await dataSource.query(`
        UPDATE level_2_categories
            SET description = ?
        WHERE
            id = ?
    `, [description, categoryId]) : ''
}

const deleteLevel_2_Category = async(categoryId: number) => {
    await dataSource.query(`
        DELETE
            FROM level_2_categories
        WHERE
            id = ?
    `, [categoryId])
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
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    updateCategoryImg,
    createLevel_2_Category,
    updateLevel_2_Category,
    deleteLevel_2_Category,
    findlv2CategoryById,
}

