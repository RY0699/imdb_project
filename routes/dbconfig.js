require('dotenv').config();

module.exports = {
    user : process.env.NODE_ORACLEDB_USER || "oracle",

    password : process.env.NODE_ORACLEDB_PASSWORD || "oracle",

    connectionString : process.env.NODE_ORACLE_DB_CONNECTIONSTRING || "localhost/XE",

    externalAuth : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};