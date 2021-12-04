const dbconfig = require('./dbconfig.js');
const bodyParser = require('body-parser');
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const connectionAttributes = {
    "user" : dbconfig.user,
    "password": dbconfig.password,
    "connectString": dbconfig.connectionString
}

app.use(cors());

app.get('/genreratings', function(req, res) {
    "use strict";
    oracledb.getConnection(connectionAttributes, function (err, connection) {
        if (err) {
            res.set('Content-type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Cannot connect to Database",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("select rohityerramsetty.title.startYear, avg(averagerating) AS averagerating from dkanchanapalli.ratings JOIN rohityerramsetty.title ON ratings.tconst = rohityerramsetty.title.tconst WHERE ratings.tconst in (SELECT tconst FROM rohityerramsetty.title where genres like '%Comedy%') group by rohityerramsetty.title.startYear order by rohityerramsetty.title.startYear", {}, {
            outFormat: oracledb.OBJECT //result as oject
        }, function(err, result) {
            if (err) {
                res.set('Content-type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Cannot connect to Database",
                    detailed_message: err.message
                }));
              }  else {
                    res.contentType('application/json').status(200);
                    res.send(JSON.stringify(result.rows));
                }

                connection.release(
                    function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                        else {
                            console.log("GET /genreratings : Connection released");
                        }
                    });
                });
        });
    });
    

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port));