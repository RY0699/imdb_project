const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

async function run() {

let connection;

try {

    connection = await oracledb.getConnection({
        user: dbconfig.user, password: dbconfig.password, connectionString: dbconfig.connectionString
    });

    console.log("Successfully connected to Oracle Database")

   
} finally {
    if (connection) {
        try {
            await connection.close();
            console.log("Successfully closed connection")
        } catch (err) {
            console.error(err);
        }
    }
}

}

run();