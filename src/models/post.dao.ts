import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";
const updatePostForm = async (postForm: CompanyPostFormInput) => {
  const answer = await dataSource.query(
    `
      UPDATE
        company_post_forms
      SET
        company_name = ?,
        level_2_categories_id = ?,
        company_img_url = ?,
        company_short_desc = ?,
        homepage_url = ?,
        main_bussiness_tags = ?,
        company_long_desc = ?,
        fastfive_benefit_desc = ?,
        company_contact_address = ?,
        company_info_url = ?,
        fastfive_branches_id = ?
      `,
    [
      postForm.companyName,
      postForm.level2CategoriesId,
      postForm.companyImgUrl,
      postForm.companyShortDesc,
      postForm.homepageUrl,
      postForm.mainBussinessTags,
      postForm.companyLongDesc,
      postForm.fastfiveBenefitDesc,
      postForm.companyContactAddress,
      postForm.companyInfoUrl,
      postForm.fastfiveBranchesId,
    ]
  );
  return answer;
};

const createPostForm = async (postFormInput: CompanyPostFormInput) => {
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
        company_post_forms(
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

const getPostForm = async (serchOption?: PostFormSearchOption) => {
  if (!serchOption) serchOption = {};
  const limit = 1;
  let { id, usersId, companiesId } = serchOption;
  const testText = `
  SELECT
    cpf.id,
    cpf.company_name,
    cpf.company_img_url,
    cpf.company_short_desc,
    cpf.homepage_url,
    cpf.main_bussiness_tags,
    cpf.company_long_desc,
    cpf.fastfive_benefit_desc,
    cpf.company_contact_address,
    cpf.company_info_url,
    JSON_OBJECT(
      'id',
      loc.id,
      'location_name',
      loc.location_name
    ) AS location,
    JSON_OBJECT(
      'id',
      fb.id,
      'branch_name',
      fb.branch_name
    ) AS branch,
    JSON_OBJECT(
      'id',
      c.id,
      'company_name',
      c.company_name
    ) AS company,
    JSON_OBJECT(
      'lv1_id',
      lv1_cate.id,
      'lv1_name',
      lv1_cate.category_name,
      'lv2_id',
      lv2_cate.id,
      'lv2_name',
      lv2_cate.category_name
    ) AS category
  FROM
    company_post_forms 			AS cpf
    JOIN companies 					AS c ON c.id = cpf.companies_id
    JOIN level_2_categories AS lv2_cate ON lv2_cate.id = cpf.level_2_categories_id
    JOIN level_1_categories AS lv1_cate ON lv1_cate.id = lv2_cate.level_1_categories_id
    JOIN fastfive_branches 	AS fb ON fb.id = cpf.fastfive_branches_id
    JOIN locations 					AS loc ON loc.id = fb.locations_id
    ${whereBuilder("cpf.id", id, true)}
    ${whereBuilder("c.id", companiesId)}
    ${whereBuilder("cpf.users_id", usersId)}
  LIMIT ${limit}
  `;
  console.log("testText: ", testText);
  const answer = await dataSource
    .query(
      `
			SELECT
				cpf.id,
				cpf.company_name,
				cpf.company_img_url,
				cpf.company_short_desc,
				cpf.homepage_url,
				cpf.main_bussiness_tags,
				cpf.company_long_desc,
				cpf.fastfive_benefit_desc,
				cpf.company_contact_address,
				cpf.company_info_url,
				JSON_OBJECT(
					'id',
					loc.id,
					'location_name',
					loc.location_name
				) AS location,
				JSON_OBJECT(
					'id',
					fb.id,
					'branch_name',
					fb.branch_name
				) AS branch,
				JSON_OBJECT(
					'id',
					c.id,
					'company_name',
					c.company_name
				) AS company,
				JSON_OBJECT(
					'lv1_id',
					lv1_cate.id,
					'lv1_name',
					lv1_cate.category_name,
					'lv2_id',
					lv2_cate.id,
					'lv2_name',
					lv2_cate.category_name
				) AS category
			FROM
				company_post_forms 			AS cpf
				JOIN companies 					AS c ON c.id = cpf.companies_id
				JOIN level_2_categories AS lv2_cate ON lv2_cate.id = cpf.level_2_categories_id
				JOIN level_1_categories AS lv1_cate ON lv1_cate.id = lv2_cate.level_1_categories_id
				JOIN fastfive_branches 	AS fb ON fb.id = cpf.fastfive_branches_id
				JOIN locations 					AS loc ON loc.id = fb.locations_id
        ${whereBuilder("cpf.id", id, true)}
        ${whereBuilder("c.id", companiesId)}
        ${whereBuilder("cpf.users_id", usersId)}
			LIMIT ${limit}
      `
    )
    .then((list) => {
      console.log("list: ", list);
      list = [...list].map((item) => {
        return {
          ...item,
          company: JSON.parse(item.company),
          category: JSON.parse(item.category),
          location: JSON.parse(item.location),
          branch: JSON.parse(item.branch),
        };
      });
      if (usersId || id) {
        let [item] = list;
        return item;
      }
      return list;
    });

  return answer;
};

export default {
  createPostForm,
  updatePostForm,
  getPostForm,
};
