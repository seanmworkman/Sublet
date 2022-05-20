const _ = require("lodash");

const axios = require('axios');


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

module.exports.users = users;