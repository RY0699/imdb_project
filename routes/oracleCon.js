const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');

async function run() {

let connection;

try {

    connection = await oracledb.getConnection({
        user: dbconfig.user, password: dbconfig.password, connectionString: dbconfig.connectionString
    });

    console.log("Successfully connected to Oracle Database")
    connection.execute(
        "select rohityerramsetty.title.startYear, avg(averagerating) from dkanchanapalli.ratings JOIN rohityerramsetty.title ON ratings.tconst = rohityerramsetty.title.tconst WHERE ratings.tconst in (SELECT tconst FROM rohityerramsetty.title where genres like '%Comedy%') group by rohityerramsetty.title.startYear order by rohityerramsetty.title.startYear",

        function(err, result)
        {
            if(err) {
                console.error(err.message);
                return;
            }
            console.log(result.metaData);
            console.log(result.rows);
        });
   
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