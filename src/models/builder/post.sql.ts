const domain = `${process.env.HOST_URL || 'http://localhost'}:${process.env.PORT || 5500}`;
const defaultPostImgUrl = '/post/default-img.jpg';
const defaultUserImgUrl = '/user/default-img.png';

const getQueryOfSelectPost = () =>
  `
  SELECT
    p.id,
    p.title,
    p.content,
    CONCAT('${domain}',IFNULL(p.thumnail_img_url, '${defaultPostImgUrl}')) AS thumnailImgUrl,
    p.secret_type AS secretType,
    p.created_at as createdAt,
    JSON_OBJECT(
      'id',
      cate.id,
      'categoryName',
      cate.category_name
    ) AS category,
    JSON_OBJECT(
      'id',
      u.id,
      'nickname',
      u.nickname,
      'profileImgUrl',
      CONCAT('${domain}',IFNULL(u.profile_img_url, '${defaultUserImgUrl}'))
    ) AS user,
    JSON_OBJECT(
      'id',
      t.id,
      'topicName',
      t.topic_name
    ) AS topic,
    tagsOnPost.tags
  FROM
    posts AS p
    JOIN users AS u
      ON u.id = p.users_id
    LEFT JOIN categories AS cate
      ON cate.id = p.categories_id
    LEFT JOIN topics AS t
      ON t.id = p.topics_id
    LEFT JOIN ( -- select list of tag on post
      SELECT
        posts_id,
        JSON_ARRAYAGG(JSON_OBJECT("id", tags_id, "tagName", tag_name)) AS tags
      FROM
        posts_tags pt
        JOIN tags t ON t.id = pt.tags_id
      GROUP BY
        posts_id
    ) tagsOnPost
      ON tagsOnPost.posts_id = p.id
  `

const getQueryOfOpenRange = (loginedUserId: string) =>
  `
    AND
    (
      p.secret_type = 0
      ${loginedUserId?
      ` -- 당신꺼면 볼 수 있다.
        OR (p.users_id = ?)
        -- 맞팔이면 볼 수 있다.
        OR
          (
            p.secret_type = 1 AND p.users_id IN
            (
              SELECT DISTINCT
                myFollow.target_users_id AS users_id
              FROM
                follow myFollow,
                follow yourFollow
              WHERE
              (
                myFollow.users_id = ?
                AND myFollow.users_id = yourFollow.target_users_id
                AND myFollow.target_users_id = yourFollow.users_id
              )
            )
          )
      ` : ""}
    )
  `

const getQueryOfMyFollow = (myFollowing: string) =>
  `
    ${myFollowing ?
      `
      AND p.users_id IN
      (
        SELECT DISTINCT
          follow.target_users_id AS users_id
        FROM
          follow
        WHERE
        (
          follow.users_id = ?
        )
      )
      `: ''}
  `

export {
  getQueryOfSelectPost,
  getQueryOfOpenRange,
  getQueryOfMyFollow,
}
