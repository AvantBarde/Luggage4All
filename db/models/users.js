const client = require('../client');
const bcrypt = require("bcrypt");
const SALT_COUNT = 8;


async function createUser({ firstName, lastName, email, imageURL, username, password, isAdmin }) {
  // console.log("trying to create user", username, password)
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user]
    } = await client.query(
      `
        INSERT INTO users("firstName", "lastName", email, "imageURL", username, password, "isAdmin")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `,
      [firstName, lastName, email, imageURL, username, hashedPassword, isAdmin]
    );
    console.log(user)
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT id, username, password
        FROM users
        WHERE id=${userId}
      `);

    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}


// const getUser = async ({ username, password }) => {
//   try {
//     const user = await getUserByUsername(username);
//     if (!user) return;
//     const hashedPassword = user.password;
//     const passwordsMatch = await bcrypt.compare(password, hashedPassword);
//     if (!passwordsMatch) return;
//     delete user.password;
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };


//switched getUser to this and it worked
const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);

    const passwordsMatch = bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      delete user.password;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to get user:", username);
    throw error;
  }
};


async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users
      `);
    return rows;
  } catch (error) {
    console.log("Error on getAllUsers");
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.log("Error on getUserByUsername");
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  getUser,
  getUserByUsername
};
