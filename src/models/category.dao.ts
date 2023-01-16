import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";

const getCategories = async (option: CategorySerarchOption) => {
  let { cateId, userId, cateName } = option;

  const categories = await dataSource.query(
    `
    SELECT
      id,
      category_name,
      category_name AS categoryName
    FROM
      categories
    ${whereBuilder("id", ["="], cateId, true)}
    ${whereBuilder("users_id", ["="], userId)}
    ${whereBuilder("category_name", ["="], cateName)}
    ORDER BY
      id
    `
  );
  return categories;
};

const createCategories = async (userId: string, categoryName: string) => {
  const categories = await dataSource.query(
    `
      INSERT INTO
        categories
        (users_id, category_name)
      VALUES
        (?, ?)
      `,
    [userId, categoryName]
  );
  return categories;
};

const deleteCategories = async (categoryId: string) => {
  const categories = await dataSource.query(
    `
      DELETE FROM
        categories
      WHERE
        id = ?
      `,
    [categoryId]
  );
  return categories;
};

const updateCategories = async (cateId: string, cateName: string) => {
  const categories = await dataSource.query(
    `
      UPDATE
        categories
      SET
        category_name = ?
      WHERE
        id = ?
      `,
    [cateName, cateId]
  );
  return categories;
};

export default {
  getCategories,
  createCategories,
  deleteCategories,
  updateCategories,
};
