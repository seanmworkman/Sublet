const OrientDBClient = require("orientjs").OrientDBClient;

/**
 * Creates an OrientDB connection
 * @returns (pool)
 */
createConnectionPool = async () => {
    let client = await OrientDBClient.connect({
        host: "localhost",
        port: 2424
    });

    console.log("Connected to OrientDB Client...")

    // let pool = await client.sessions({
    //     name: "Sublet",
    //     username: "root",
    //     password: "qS>kv@wq+.L9u9*",
    //     pool: { max: 10 }
    // });

    let pool = await client.sessions({
        name: "Sublet",
        username: "root",
        password: "root",
        pool: { max: 10 }
    });

    console.log("OrientDB Connection Pool Open...")

    return client, pool;
}

/**
 * Closes an OrientDB connection
 * @param {*} client the orientDB client to close
 * @param {*} pool the orientDB pool to close
 */
closeConnectionPool = async (client, pool) => {
    
    console.log("Closing OrientDB Pool...")
    await pool.close();
    console.log("OrientDB Pool Closed.")

    console.log("Closing OrientDB Client...")
    await client.close();
    console.log("OrientDB Client Closed.")
}

module.exports.createConnectionPool = createConnectionPool;
module.exports.closeConnectionPool = closeConnectionPool;
