import pkg1 from 'lodash';
const { _ } = pkg1;
import pkg2 from 'orientjs';
const { OrientDBClient } = pkg2;

import { 
  createConnectionPool,
  waitForDbConnection,
  closeConnectionPool
} from '../database/connection.js';

import { ridToString } from '../database/dbUtils.js';

let client, pool = await createConnectionPool();

const zipRe = new RegExp("\b\d{5}\b");

const userFriendlyUnexpectedError = () => {
  return new Error("An unexpected error occurred");
}

const logError = (err) => {
  var stack = new Error().stack,
      caller = stack.split('\n')[2].trim();
  console.log("Error in " + caller + ":", err);
}

export const users = async () => {
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

/**
 * Retrieves all users
 * @returns 
 */
export const getAllUsers = async () => {
  try {
    console.log(pool)
    let db = await pool.acquire();
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

/**
 * Retrieves all places with specs
 * @returns 
 */
 export const getAllPlacesWithSpecs = async () => {
  try {
    let db = await pool.acquire();
    let placeSpecQuery = `
      MATCH 
        {class: Place, as: place}.both('has'){class: Spec, as: spec} 
      RETURN place, spec;
    `;
    let placeSpecRes = await db.query(placeSpecQuery).all();

    let result = [];

    for (let i = 0; i < placeSpecRes.length; i++) {
      let query = `
        SELECT EXPAND( $c ) LET 
          $a = ( 
            SELECT 
              address_line1,
              address_line2,
              city,
              state,
              zip_code
            FROM ${ridToString(placeSpecRes[i].place)} ), 
          $b = ( 
            SELECT 
              sqrft,
              bedrooms,
              bathrooms,
              price
            FROM ${ridToString(placeSpecRes[i].spec)} ), $c = UNIONALL( $a, $b )
      `;
      let temp = await db.query(query).all();
      result.push({
        ...temp[0],
        ...temp[1]
      });
    }

    db.close();
    return result;
  } catch (err) {
    userFriendlyUnexpectedError();
    logError(err);
  }
}

/**
 * Retrieves places based on search input 
 * TODO: AND PERSONAL DATA
 * @returns 
 */
export const getPlaceSearchResult = async (root, { searchInput, personalData, userInfo }) => {
  try {
    console.log(searchInput)
    let db = await pool.acquire();

    let placeSpecQuery = ``;
    let placeSpecRes = [];
    
    if (/^\+?(0|[1-9]\d*)$/.test(searchInput)) {
      placeSpecQuery = `
        MATCH 
          {class: Place, as: place, where: (zip_code == :searchInput)}.both('has'){class: Spec, as: spec} 
        RETURN place, spec;
      `;
      placeSpecRes = await db.query(placeSpecQuery, {
        params: {
          searchInput: parseInt(searchInput)
        }
      }).all();
    }
    else {
      placeSpecQuery = `
        MATCH 
          {class: Place, as: place, where: (city == :searchInput)}.both('has'){class: Spec, as: spec} 
        RETURN place, spec;
      `;
      placeSpecRes = await db.query(placeSpecQuery, {
        params: {
          searchInput: searchInput.toUpperCase()
        }
      }).all();
    }

    console.log(placeSpecRes)

    let result = [];

    for (let i = 0; i < placeSpecRes.length; i++) {
      let query = `
        SELECT EXPAND( $c ) LET 
          $a = ( 
            SELECT 
              address_line1,
              address_line2,
              city,
              state,
              zip_code
            FROM ${ridToString(placeSpecRes[i].place)} ), 
          $b = ( 
            SELECT 
              sqrft,
              bedrooms,
              bathrooms,
              price
            FROM ${ridToString(placeSpecRes[i].spec)} ), $c = UNIONALL( $a, $b )
      `;
      let temp = await db.query(query).all();
      result.push({
        ...temp[0],
        ...temp[1]
      });
    }

    db.close();
    return result;
  } catch (err) {
    userFriendlyUnexpectedError();
    logError(err);
  }
}