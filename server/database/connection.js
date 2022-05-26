import pkg from 'orientjs';
const { OrientDBClient } = pkg;


/**
 * Creates an OrientDB connection
 * @returns (pool)
 */
export const createConnectionPool = async () => {
    let client = await OrientDBClient.connect({
      host: "localhost",
      port: 2424
    });

    console.log("Connected to OrientDB Client...")

    let pool = await client.sessions({
      name: "Sublet",
      username: "root",
      password: "root",
      pool: { max: 10 }
    });

    console.log("OrientDB Connection Pool Open...")

    return client, pool;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const waitForDbConnection = async () => {
    await sleep(100000);
    console.log('OrientDB Pool Connected.')
}

/**
 * Closes an OrientDB connection
 * @param {*} client the orientDB client to close
 * @param {*} pool the orientDB pool to close
 */
export const closeConnectionPool = async (client, pool) => {
    
    console.log("Closing OrientDB Pool...")
    await pool.close();
    console.log("OrientDB Pool Closed.")

    console.log("Closing OrientDB Client...")
    await client.close();
    console.log("OrientDB Client Closed.")
}
