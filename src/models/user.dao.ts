import dataSource from './database';

async function findUserByEmail(email : string) : Promise<UserInfo> {
  const [userInfo] = await dataSource.query(`
    SELECT
      id,
      password
    FROM users
    WHERE
    email = ?
  `, [email]);
  return userInfo as UserInfo;
}

async function findUserById(id : string) : Promise<UserInfo> {
  const [userInfo] = await dataSource.query(`
    SELECT
      id,
      password,
      email,
      nickname
    FROM users
    WHERE
    id = ?
  `, [id]);
  return userInfo as UserInfo;
}

async function getAllUser() {
  const allUsers = await dataSource.query(`
    SELECT
      id,
      email,
      nickname
    FROM users
  `);
  return allUsers;
}

async function addUser(userInfo : {email: string, password: string, nickname: string, profile_image: string}) {
  const {email, nickname, password, profile_image} = userInfo;
  return await dataSource.query(
    `INSERT INTO users(
                        email,
                        nickname,
                        password,
                        profile_image
                      ) VALUES (?, ?, ?, ?);
                      `,
    [email, nickname, password, profile_image]
  )
}

export default {
  findUserByEmail,
  findUserById,
  getAllUser,
  addUser,
}