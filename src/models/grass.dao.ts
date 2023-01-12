import dataSource from "./database";
import { whereBuilder } from "./builder/queryBuilder";

const getGrasses = async (searchInput: GrassSearchType) => {
  let { userId, timezone = "+9:00", withinDay = 0 } = searchInput;
  if (timezone.startsWith(' ')) {
    timezone = "+" + timezone.trim();
  }

  const grasses = await dataSource
    .query(
      `
        SELECT
          SUBSTRING(CONVERT_TZ(created_at, '+09:00', ?), 1, 10) AS date,
          JSON_OBJECT("count", count(*)) AS posts,
          JSON_OBJECT("count", 0) AS comments,
          count(*) as count
        FROM
          posts AS p
        ${whereBuilder("p.id", ["="], null, true)}
        ${whereBuilder("p.users_Id", ["="], userId)}
        ${whereBuilder("p.created_at", [">=",,"NO_QUOTE"], 'SUBDATE(now(), INTERVAL ? DAY)')}
        GROUP BY
          date
      `,
      [timezone, withinDay]
    )
    .then((answer) => {
      return [...answer].map((item) => {
        const count = Number(item.count);
        let level;
        switch (Math.floor(count / 2)) {
          case 0:
            level = 1;
            break;
          case 1:
            level = 2;
            break;
          default:
            level = 3;
            break;
        }

        return {
          ...item,
          posts: JSON.parse(item.posts),
          comments: JSON.parse(item.comments),
          count,
          level,
        };
      });
    });
  return grasses;
};

export default {
  getGrasses,
};
