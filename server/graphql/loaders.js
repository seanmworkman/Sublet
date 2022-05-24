const _ = require("lodash");

const axios = require('axios');

const OrientDBClient = require("orientjs").OrientDBClient;

const { 
  createConnectionPool,
  closeConnectionPool
} = require('../database/connection');

const getDbConnection = async () => {
  let pool = await createConnectionPool();
  let session = await pool.acquire();
  return session;
}

const userFriendlyUnexpectedError = () => {
  return new Error("An unexpected error occurred");
}

const logError = (err) => {
  var stack = new Error().stack,
      caller = stack.split('\n')[2].trim();
  console.log("Error in " + caller + ":", err);
}

const users = async () => {
  try {
    const users = await axios.get("https://api.github.com/users")
    return users.data.map(({ id, login, avatar_url }) => ({
      id,
      login,
      avatar_url,
    }))
  } catch (error) {
    throw error
  }
}

const getAllUsers = async () => {
  try {
    let db = await getDbConnection();
    let userQuery = "SELECT first_name, last_name, phone, email FROM User"
    let result = await db.query(userQuery).all();

    console.log(result);

    db.close();
    return result;
  } catch (err) {
    userFriendlyUnexpectedError();
    logError(err);
  }
}

module.exports.users = users;
module.exports.getAllUsers = getAllUsers;