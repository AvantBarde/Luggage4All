const client = require("../client");
const bcrypt = require("bcrypt");

async function createAdmin({ username, password }) {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO admins(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
      [username, hashedPassword]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAdmin({ username, password }) {
  const user = await getAdminByUsername(username);
  const hashedPassword = user.password;

  const comparePassword = await bcrypt.compare(password, hashedPassword);

  if (comparePassword) {
    delete user["password"];

    return user;
  }
}

async function getAdminByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM admins
            WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAdmin,
  getAdmin,
  getAdminByUsername,
};