const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

const router = require('express').Router();

async function run() {

let connection;

try {

    connection = await oracledb.getConnection({
        user: dbconfig.user, password: dbconfig.password, connectionString: dbconfig.connectionString
    });

    console.log("Successfully connected to Oracle Database")

    connection.execute(
        //Statement to execute
    );
}   catch (err) {
    console.error(err);
} finally {
    if (connection) {
        try {
            await connection.close();
        } catch (err) {
            console.error(err);
        }
    }
}

}

run();