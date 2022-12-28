import dataSource from './database';

const getAllCategories = async () => {
    const result = await dataSource.query(`
    SELECT
	    level_1_categories.id,
        level_1_categories.category_name AS categoryName,
        level_1_categories.img_url AS imgUrl,
        level_1_categories.description,
        JSON_ARRAYAGG
            (JSON_OBJECT
                ("id",level_2_categories.id, "category", level_2_categories.category_name)) as subCategory
    FROM
	    level_1_categories
    JOIN level_2_categories ON level_2_categories.level_1_categories_id = level_1_categories.id
    GROUP BY level_1_categories.id, level_1_categories.category_name
    `).then(list => {
      return [...list].map(category => {
        const domain = `${process.env.HOST_URL || 'http://localhost'}:${process.env.PORT || 5500}`;
        return {
          ...category,
          subCategory: JSON.parse(category.subCategory),
          imgUrl: category.imgUrl.startsWith("http") ? category.imgUrl : domain + category.imgUrl
        };
      })
    });
    return result;
}

const getCateLv1Length = async() => {
    const [result] = await dataSource.query(`
        SELECT
            max(id) as max
        FROM
            level_1_categories
    `)
    return result as {max: number}
}

const findCategoryById = async (categoryId: number) => {
    const [result] = await dataSource.query(`
        SELECT
            id,
            img_url AS imgUrl,
            categoryName,
            description
        FROM
            level_1_categories
        WHERE
            id = ?
    `, [categoryId]);
    return result as {id: number, imgUrl: string, categoryName: string, description: string};
}

const createCategory = async(imgUrl: string, categoryName: string, description: string) => {
    await dataSource.query(`
        INSERT INTO
            level_1_categories (
                img_url AS imgUrl,
                category_name,
                description)
        VALUES
            (?, ?, ?)
    `, [imgUrl, categoryName, description]);
}

const updateCategory = async(categoryId: number, categoryName?: string, description?: string) => {
  categoryName ? await dataSource.query(`
        UPDATE level_1_categories
            SET category_name = ?
        WHERE
            id = ?
    `, [categoryName, categoryId]) : ''
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

const updateCategoryImg = async(imgUrl:string, categoryId: number) => {
    await dataSource.query(`
        UPDATE level_1_categories
            SET level_1_categories.img_url = ?
        WHERE
            id = ?
    `, [imgUrl, categoryId])
}

const createLevel_2_Category = async(level_1_categories_id: number, categoryName: string) => {
    await dataSource.query(`
        INSERT INTO
            level_2_categories (
                level_1_categories_id,
                category_name
            )
        VALUES
            (?, ?)
    `, [level_1_categories_id, categoryName]);
}

const updateLevel_2_Category = async(categoryId: number, categoryName?: string, description?: string) => {
  categoryName ? await dataSource.query(`
        UPDATE level_2_categories
            SET category_name = ?
        WHERE
            id = ?
    `, [categoryName, categoryId]) : ''
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
        category_name AS categoryName,
        description
      FROM
        level_2_categories
      WHERE
        id = ?
  `, [categoryId]);
  return result;
}

const findCategoryByCateName = async (categoryName: string) => {
  const [result] = await dataSource.query(`
      SELECT
          id,
          img_url AS imgUrl,
          category_name AS categoryName,
          description
      FROM
          level_1_categories
      WHERE
          category_name = ?
  `, [categoryName]);
  return result as {id: number, imgUrl: string, categoryName: string, description: string};
}

export default {
    getAllCategories,
    getCateLv1Length,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    updateCategoryImg,
    createLevel_2_Category,
    updateLevel_2_Category,
    deleteLevel_2_Category,
    findlv2CategoryById,
    findCategoryByCateName,
}

