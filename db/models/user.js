// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows: users } = await client.query(`
      SELECT *
      FROM users
    `);
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createUser({ firstName, lastName, email, username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { rows: [user] } = await client.query(
      `
    INSERT INTO users(firstName, lastName, username, password, email)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT DO NOTHING
    RETURNING *;
    `,
      [firstName, lastName, username, email, hashedPassword]
    );
    return rows;
  } catch (error) {
    console.error("error with creating the user. check createUser()");
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    if (!username || !password) {
      return;
    }
    const user = await getUserByUsername(username);
    if (!user) {
      return;
    }
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    console.error("error getting the user. Check getUserByUsername()");
    throw error;
  }
}

async function getUserById(id) {
  try {
    const { rows: user } = await client.query(`
    SELECT *
    FROM users
    WHERE id=${id}
  `);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: user } = await client.query(`
      SELECT *
      FROM users
      WHERE username=${username};
    `);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// delete user by id
async function deleteUser(userId) {
  try {
    const { rows: user } = await client.query(`
      DELETE FROM users
      WHERE id=${userId}
      RETURNING *;
    `);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// update user by id
async function updateUser(userId, username, password, firstName, lastName, email) {
  try {
    const { rows: user } = await client.query(`
      UPDATE users
      SET firstName=${firstName}, lastName=${lastName}, username=${username}, password=${password}, email=${email}
      WHERE id=${userId}
      RETURNING *;
    `);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  deleteUser,
  updateUser,
};
