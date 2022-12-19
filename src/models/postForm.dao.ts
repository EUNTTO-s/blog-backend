import dataSource from "./database";
import { whereBuilder, setBuilder} from "./builder/queryBuilder";
const updatePostForm = async (postForm: CompanyPostFormInput) => {
  const propertyArray : [string, string][] = [
    ['company_name',          postForm.companyName],
    ['level_2_categories_id', postForm.level2CategoriesId],
    ['company_short_desc',    postForm.companyShortDesc],
    ['homepage_url',          postForm.homepageUrl],
    ['main_bussiness_tags',   postForm.mainBussinessTags],
    ['company_long_desc',     postForm.companyLongDesc],
    ['fastfive_benefit_desc', postForm.fastfiveBenefitDesc],
    ['company_img_url',       postForm.companyImgUrl],
    ['company_info_url',      postForm.companyInfoUrl],
    ['users_id',              postForm.usersId],
  ]
  const [stateOfSet, filterdValueArr] = setBuilder(propertyArray);
  const answer = await dataSource.query(
    `
      UPDATE
        company_post_forms
      SET
        ${stateOfSet}
      WHERE users_id = ?
      `,
    [...filterdValueArr, postForm.usersId]
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
  const answer = await dataSource
    .query(
      `
			SELECT
				cpf.id,
				cpf.company_name AS companyName,
				cpf.company_img_url AS companyImgUrl,
				cpf.company_short_desc AS companyShortDesc,
				cpf.homepage_url AS homepageUrl,
				cpf.main_bussiness_tags AS mainBussinessTags,
				cpf.company_long_desc AS companyLongDesc,
				cpf.fastfive_benefit_desc AS fastfiveBenefitDesc,
				cpf.company_contact_address AS companyContactAddress,
				cpf.company_info_url AS companyInfoUrl,
				cpf.users_id AS usersId,
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
      list = [...list].map((item) => {
        const domain = 'http://localhost:5500';
        const companyImgUrl = item.companyImgUrl? `${domain}${item.companyImgUrl}` : '';
        const companyInfoUrl = item.companyInfoUrl? `${domain}${item.companyInfoUrl}` : '';
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
      if (usersId || id) {
        let [item] = list;
        return item;
      }
      return list;
    });

  return answer;
};

const getCompanyMemberByUserId = async (userId: string) => {
  const [companyMember] = await dataSource
    .query(
      `
      SELECT
        cpm.companies_id,
        cpm.users_id,
        cpm.is_main_member,
        JSON_OBJECT(
          'id',
          cp.id,
          'companyName',
          cp.company_name
        ) AS company
      FROM
        company_members AS cpm
      JOIN
        companies AS cp
      ON
        cp.id = cpm.companies_id
      WHERE
        users_id = ?
      `, [userId]
    )
  if (!companyMember) {
    return companyMember;
  }
  return {...companyMember, company: JSON.parse(companyMember.company || "")};
}

export default {
  createPostForm,
  updatePostForm,
  getPostForm,
  getCompanyMemberByUserId,
};
