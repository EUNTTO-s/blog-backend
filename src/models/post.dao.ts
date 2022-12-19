import dataSource from "./database";
import { whereBuilder, setBuilder } from "./builder/queryBuilder";

const createPost = async (postFormInput: CompanyPostInput) => {
  const {
    companiesId = "",
    companyName = "",
    level2CategoriesId = "",
    companyImgUrl = "",
    companyShortDesc = "",
    homepageUrl = "",
    mainBussinessTags = "",
    companyLongDesc = "",
    fastfiveBenefitDesc = "",
    companyContactAddress = "",
    companyInfoUrl = "",
    fastfiveBranchesId = "",
    usersId = "",
  } = postFormInput;
  const answer = await dataSource.query(
    `
      INSERT INTO
        company_posts(
          companies_id,
          company_name,
          company_contact_address,
          company_img_url,
          company_info_url,
          company_long_desc,
          company_short_desc,
          fastfive_benefit_desc,
          fastfive_branches_id,
          homepage_url,
          level_2_categories_id,
          main_bussiness_tags,
          users_id
        )
      VALUES
      (?,?,?,?,?,?,?,?,?,?,?,?,?);
    `,
    [
      companiesId,
      companyName,
      companyContactAddress,
      companyImgUrl,
      companyInfoUrl,
      companyLongDesc,
      companyShortDesc,
      fastfiveBenefitDesc,
      fastfiveBranchesId,
      homepageUrl,
      level2CategoriesId,
      mainBussinessTags,
      usersId,
    ]
  );
  return answer;
};

const getPost = async (serchOption?: PostSearchOption) => {
  if (!serchOption) serchOption = {};
  const limit = 1;
  let {
    id,
    companiesId,
    locationsId,
    categoriesLv1Id,
    categoriesLv2Id,
    offset = 10,
    page = 1,
  } = serchOption;
  const answer = await dataSource
    .query(
      `
      SELECT
        cp.id,
        cp.company_name AS companyName,
        cp.company_img_url AS companyImgUrl,
        cp.company_short_desc AS companyShortDesc,
        cp.homepage_url AS homepageUrl,
        cp.main_bussiness_tags AS mainBussinessTags,
        cp.company_long_desc AS companyLongDesc,
        cp.fastfive_benefit_desc AS fastfiveBenefitDesc,
        cp.company_contact_address AS companyContactAddress,
        cp.company_info_url AS companyInfoUrl,
        cp.users_id AS usersId,
        JSON_OBJECT(
          'id',
          loc.id,
          'locationName',
          loc.location_name
        ) AS location,
        JSON_OBJECT(
          'id',
          fb.id,
          'branchName',
          fb.branch_name
        ) AS branch,
        JSON_OBJECT(
          'id',
          c.id,
          'companyName',
          c.company_name
        ) AS company,
        JSON_OBJECT(
          'lv1Id',
          lv1_cate.id,
          'lv1Name',
          lv1_cate.category_name,
          'lv2Id',
          lv2_cate.id,
          'lv2Name',
          lv2_cate.category_name
        ) AS category
      FROM
        company_posts 			AS cp
        JOIN companies 					AS c ON c.id = cp.companies_id
        JOIN level_2_categories AS lv2_cate ON lv2_cate.id = cp.level_2_categories_id
        JOIN level_1_categories AS lv1_cate ON lv1_cate.id = lv2_cate.level_1_categories_id
        JOIN fastfive_branches 	AS fb ON fb.id = cp.fastfive_branches_id
        JOIN locations 					AS loc ON loc.id = fb.locations_id
        ${whereBuilder("cp.id", id, true)}
        ${whereBuilder("c.id", companiesId)}
        ${whereBuilder("loc.id", locationsId)}
        ${whereBuilder("lv1_cate.id", categoriesLv1Id)}
        ${whereBuilder("lv2_cate.id", categoriesLv2Id)}
      LIMIT ${limit} OFFSET ${offset * (page - 1)}
      `
    )
    .then((list) => {
      list = [...list].map((item) => {
        const domain = "http://localhost:5500";
        const companyImgUrl = item.companyImgUrl
          ? `${domain}${item.companyImgUrl}`
          : "";
        const companyInfoUrl = item.companyInfoUrl
          ? `${domain}${item.companyInfoUrl}`
          : "";
        return {
          ...item,
          company: JSON.parse(item.company),
          category: JSON.parse(item.category),
          location: JSON.parse(item.location),
          branch: JSON.parse(item.branch),
          companyImgUrl,
          companyInfoUrl,
        };
      });
      if (companiesId || id) {
        let [item] = list;
        return item;
      }
      return list;
    });

  return answer;
};

const updatePost = async (postForm: CompanyPostFormInput) => {
  const propertyArray : [string, string, boolean?][] = [
    ['company_name',          postForm.companyName],
    ['level_2_categories_id', postForm.level2CategoriesId, true],
    ['company_short_desc',    postForm.companyShortDesc],
    ['homepage_url',          postForm.homepageUrl],
    ['main_bussiness_tags',   postForm.mainBussinessTags],
    ['company_long_desc',     postForm.companyLongDesc],
    ['fastfive_benefit_desc', postForm.fastfiveBenefitDesc],
    ['company_img_url',       postForm.companyImgUrl],
    ['company_info_url',      postForm.companyInfoUrl],
    ['users_id',              postForm.usersId, true],
  ];
  const [stateOfSet, filterdValueArr] = setBuilder(propertyArray);
  const answer = await dataSource.query(
    `
      UPDATE
        company_posts
      SET
        ${stateOfSet}
      WHERE users_id = ?
      `,
    [...filterdValueArr, postForm.usersId]
  );
  return answer;
};

const deletePost = async (postId: string) => {
  const answer = await dataSource.query(
    `
    DELETE FROM
      company_posts
    WHERE
      id = ?
      `,
    [postId]
  );
  return answer;
};

export default {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
