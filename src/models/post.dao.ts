import dataSource from './database';
import {whereBuilder} from './builder/queryBuilder'
async function updatePostForm(postForm: CompanyPostFormInput) {
  const answer = await dataSource
    .query(
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
}

async function createPostForm(postFormInput : CompanyPostFormInput) {
  const {
    companiesId = '',
    companyName = '',
    level2CategoriesId = '',
    companyImgUrl = '',
    companyShortDesc = '',
    homepageUrl = '',
    mainBussinessTags = '',
    companyLongDesc = '',
    fastfiveBenefitDesc = '',
    companyContactAddress = '',
    companyInfoUrl = '',
    fastfiveBranchesId = '',
    usersId = ''
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
      usersId
    ]
  );
  return answer;
};


async function getPostForm(serchOption? : PostFormSearchOption) {
  if (!serchOption)
    serchOption = {};
    const limit = 1;
  let { id, usersId, companiesId, } = serchOption;
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
    ${whereBuilder('cpf.id', id, true)}
    ${whereBuilder('c.id', companiesId)}
    ${whereBuilder('cpf.users_id', usersId)}
  LIMIT ${limit}
  `
  console.log("testText: ", testText);
  const answer = await dataSource.query(
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
        ${whereBuilder('cpf.id', id, true)}
        ${whereBuilder('c.id', companiesId)}
        ${whereBuilder('cpf.users_id', usersId)}
			LIMIT ${limit}
      `
    ).then(list => {
      console.log("list: ", list);
			list = [...list].map((item)=> {
				return {
									...item,
									company: JSON.parse(item.company),
									category: JSON.parse(item.category),
									location: JSON.parse(item.location),
									branch: JSON.parse(item.branch),
								};
			})
      if (usersId || id) {
        let [item] = list;
        return item;
      }
      return list;
    });

  return answer;
}

async function getAllPost() {
  const answer = await dataSource
    .query(
      `SELECT
      users.id AS user_id,
      users.profile_image AS user_profile_image,
      JSON_ARRAYAGG(JSON_OBJECT("image_url_list", posts.image_list, "id", posts.id, "content", content))
        AS post_list

      FROM users

      JOIN (
        SELECT
          postings.id,
          postings.user_id,
          postings.contents AS content,
          pi.post_imgs AS image_list
        FROM
          postings
        JOIN (
          SELECT
            posting_id,
            JSON_ARRAYAGG(image_url) AS post_imgs
          FROM
            posting_images
          GROUP BY
            posting_id
        ) pi ON pi.posting_id = postings.id
      ) posts ON posts.user_id = users.id

      GROUP BY users.id
  `)
    .then((answer) => {
      return [...answer].map((userWithPost)=> {
        return {...userWithPost, post_list: JSON.parse(userWithPost.post_list) }
      })
    });
  return answer;
}

async function getPostByPostId(postId: string | number) {
  /*
  아래와 같은 값을 반환함.
  {
    "userId": 9,
    "userName": "피리",
    "postingId": 56,
    "postingImageUrl": "PATCH123.jpg",
    "postingContent": "patchTEST123"
  }
  */
  return await dataSource
    .query(
      `SELECT
        postings.id,
        postings.user_id,
        postings.contents AS content,
        pi.post_imgs AS image_list
      FROM
        postings
      JOIN (
        SELECT
          posting_id,
          JSON_ARRAYAGG(image_url) AS post_imgs
        FROM
          posting_images
        GROUP BY
          posting_id
      ) pi ON pi.posting_id = postings.id
      WHERE postings.id = ?
      `,
    [postId])
    .then((answer) => {
      if (!answer.length)
        throw {status: 404, message: "there is no matched result"};

      const post = answer[0].image_list && answer[0];
      return {...post, image_list: JSON.parse(post.image_list)} as {
        userId: number, userName: string, postingId: number, postingContent: string, postingImageUrl: string[]
      }
    })
}

async function updatePost(postId: string, contents: string, imageUrl: string) {
  return await dataSource.transaction(
    async (transactionalEntityManager) => {
      // patch contents
      const result = await transactionalEntityManager.query(
        `UPDATE postings
            SET contents = ?
          WHERE postings.id = ?
        `,
        [contents, postId]
      );
      // patch image_url
          // 먼저 기존 image_url을 전부 지움
      await transactionalEntityManager.query(
        `DELETE FROM posting_images
          WHERE posting_images.posting_id = ?;`
        ,[postId]);

        // 이후 image_url을 업데이트함.
      await transactionalEntityManager.query(
        `INSERT INTO posting_images(
          posting_id,
          image_url
        ) VALUES (?, ?);`
        ,[postId, imageUrl]);
      return result;
  });
}

async function deletePost(postId: string) {
  await dataSource.transaction(
    async (transactionalEntityManager) => {
      await transactionalEntityManager.query(
        `DELETE FROM posting_images
        WHERE posting_images.posting_id = ?;`
      ,[postId])

      const result = await transactionalEntityManager.query(
        `DELETE FROM postings
        WHERE postings.id = ?;`
      ,[postId])

      if (!result.affectedRows) {
        throw {status: 404, message: "postID에 해당하는 포스트가 존재하지 않습니다"};
      }
  });
}

async function getPostsByUserId(userId: string) {
  return await dataSource
  // 한 유저에 대한 포스트 리스트 찾기
    .query(
      `SELECT
      users.id AS user_id,
      users.profile_image AS user_profile_image,
      JSON_ARRAYAGG(JSON_OBJECT("image_url_list", posts.image_list, "id", posts.id, "content", content))
        AS post_list

      FROM users
      -- 게시물을 가져옴(게시물 이미지 리스트 테이블을 엮은)
      JOIN (
        SELECT
          postings.id,
          postings.user_id,
          postings.contents AS content,
          pi.post_imgs AS image_list
        FROM
          postings
        JOIN (
          SELECT
            posting_id,
            JSON_ARRAYAGG(image_url) AS post_imgs
          FROM
            posting_images
          GROUP BY
            posting_id
        ) pi ON pi.posting_id = postings.id
        WHERE postings.user_id = ?
      ) posts ON posts.user_id = users.id

      GROUP BY users.id
  `,
      [userId])
    .then((answer) => {
      return [...answer].map((userWithPost)=> {
        return {...userWithPost, post_list: JSON.parse(userWithPost.post_list) }
      })
    });
}

async function addLikePost(userId: string, postId: string) {
  await dataSource.query(`
    INSERT INTO
      likes_postings_users(
        user_id,
        posting_id
      )
    VALUES(?, ?)
    ON DUPLICATE KEY
      UPDATE
        user_id=user_id,
        posting_id=posting_id
  `, [userId, postId]);
}

export default {
  createPostForm,
  updatePostForm,
  getPostForm,

  getAllPost,
  getPostByPostId,
  updatePost,
  deletePost,
  getPostsByUserId,
  addLikePost,
}