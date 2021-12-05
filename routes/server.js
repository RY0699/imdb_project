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

//Graph 1.1

app.post('/genreratings', function(req, res) {
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
        const genre = req.body.genre;
        connection.execute(`select rohityerramsetty.title.startYear, avg(averagerating) AS averagerating from dkanchanapalli.ratings JOIN rohityerramsetty.title ON ratings.tconst = rohityerramsetty.title.tconst WHERE ratings.tconst in (SELECT tconst FROM rohityerramsetty.title where genres like '%${genre}%') group by rohityerramsetty.title.startYear order by rohityerramsetty.title.startYear`, {}, {
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

    //Graph 1.2

app.get('/genreRatingsSeries', function(req, res) {
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

        connection.execute("select CAST(rohityerramsetty.title.startYear as INTEGER), round(avg(averagerating),5) AS averagerating "+
        "from dkanchanapalli.ratings JOIN rohityerramsetty.title "+ 
        "ON ratings.tconst = rohityerramsetty.title.tconst "+
        "WHERE ratings.tconst in "+
        "(SELECT tconst FROM rohityerramsetty.title where genres like '%Comedy%' and (titleType = 'tvSeries' or titletype = 'tvMiniSeries')) "+
        "group by rohityerramsetty.title.startYear "+
        "order by rohityerramsetty.title.startYear", {}, {
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

//Graph 2.1

app.get('/episodeRatings', function(req, res) {
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

        connection.execute("select t.primaryTitle, CAST(e.seasonNumber as INTEGER),CAST(e.episodeNumber as INTEGER),r.averageRating, r.popularity "+
        "from dkanchanapalli.episode e,dkanchanapalli.ratings r,rohityerramsetty.title t "+
        "where e.tconst = r.tconst and "+
        "e.parent_tconst = t.tconst and "+
        "t.primaryTitle like '%Game of Thrones%' " +
        "order by t.primaryTitle, CAST(e.seasonNumber as INTEGER), CAST(e.episodeNumber as INTEGER)", {}, {
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

//Graph 3.1.1

app.get('/adultPercentMovies', function(req, res) {
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

        connection.execute("select CAST(k.startYear as INTEGER),round((k.req/J.tot * 100), 2) as percent from "+
        "(select startYear, count(*) as req from rohitYerramsetty.title where isAdult = '1' and (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) k, "+
        "(select startYear, count(*) as tot from rohitYerramsetty.title where (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) J "+
        "where k.startYear = j.startYear "+
        "order by k.startYear", {}, {
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

//Graph 3.1.2
    
app.get('/adultPercentSeries', function(req, res) {
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

        connection.execute("select CAST(k.startYear as INTEGER),round((k.req/J.tot * 100), 2) as percent from "+
        "(select startYear, count(*) as req from rohitYerramsetty.title where isAdult = '1' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear) k, "+
        "(select startYear, count(*) as tot from rohitYerramsetty.title where (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) J "+
        "where k.startYear = j.startYear "+
        "order by k.startYear", {}, {
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
            

//Graph 3.2.1

app.get('/adultGenrePercentSeries', function(req, res) {
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

        connection.execute("select CAST(k.startYear as INTEGER),round((k.req/J.tot * 100), 2) as percent from "+
        "(select t.startYear, count(*) as req from rohitYerramsetty.title t where isAdult = '1' and t.genres like '%Comedy%' and (t.titleType = 'movie' or t.titleType = 'tvMovie') "+
        "group by t.startYear) k, "+
        "(select startYear, count(*) as tot from rohitYerramsetty.title where genres like '%Drama%' and (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) J "+
        "where k.startYear = j.startYear "+
        "order by k.startYear", {}, {
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


//Graph 3.2.2

app.get('/adultGenrePercentSeries', function(req, res) {
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

        connection.execute("select CAST(k.startYear as INTEGER),round((k.req/J.tot * 100), 2) as percent from "+
        "(select startYear, count(*) as req from rohitYerramsetty.title where isAdult = '1' and genres like '%Drama%' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear) k, "+
        "(select startYear, count(*) as tot from rohitYerramsetty.title where genres like '%Drama%' and (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) J "+
        "where k.startYear = j.startYear "+
        "order by k.startYear", {}, {
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
    

//Graph 3.3.1

app.get('/adultPopularitySeries', function(req, res) {
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

        connection.execute("select CAST(startYear as INTEGER), round(avg(popularity),5) "+
        "from rohityerramsetty.title "+
        "join dkanchanapalli.ratings "+
        "on rohityerramsetty.title.tconst=dkanchanapalli.ratings.tconst "+
        "where isadult='1' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear "+
        "order by startYear", {}, {
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


//Graph 3.3.2
        
app.get('/adultPopularityMovies', function(req, res) {
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

        connection.execute("select CAST(startYear as INTEGER), round(avg(popularity),5) "+
        "from rohityerramsetty.title "+
        "join dkanchanapalli.ratings "+
        "on rohityerramsetty.title.tconst=dkanchanapalli.ratings.tconst "+
        "where isadult='1' and (titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear "+
        "order by startYear", {}, {
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

//Graph 3.4.1

app.get('/adultPopularityGenresMovies', function(req, res) {
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

        connection.execute("select CAST(startYear as INTEGER), round(avg(popularity), 5) "+
        "from rohityerramsetty.title "+
        "join ratings "+
        "on rohityerramsetty.title.tconst=ratings.tconst "+
        "where isadult='1' and (titleType = 'movie' or titleType = 'tvMovie') "+
        "and genres like '%Drama%' "+
        "group by startYear "+
        "order by startYear", {}, {
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

//Grpah 3.4.2                                


app.get('/adultPopularityGenresSeries', function(req, res) {
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

        connection.execute("select CAST(startYear as INTEGER), round(avg(popularity), 5) "+
        "from rohityerramsetty.title "+
        "join ratings "+
        "on rohityerramsetty.title.tconst=ratings.tconst "+
        "where isadult='1' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries')" +
        "and genres like '%Drama%' "+
        "group by startYear "+
        "order by startYear", {}, {
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


//Graph 4.1.1

app.get('/runtimePercent30Series', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+
        "(select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and runtime < 30 and "+
        "(titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear)K, "+ 
        "(select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear", {}, {
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

//Graph 4.1.2

app.get('/runtimePercent30and60Series', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+
        "(select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and (runtime between 30 and 60) and "+
        "(titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear) K, "+
        "(select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear", {}, {
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

//Graph 4.1.3

app.get('/runtimePercent60Series', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+
        "(select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and runtime > 60 and "+
        "(titleType = 'tvSeries' or titleType = 'tvMiniSeries') "+
        "group by startYear) K, "+
        "(select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear ", {}, {
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

//Graph 4.2.1

app.get('/runtimePercent90Movies', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+
        "(select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and runtime < 90 and "+
        "(titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) K, "+
        "(select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear", {}, {
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

//Graph 4.2.2

app.get('/runtimePercent90to120Movies', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+
        "(select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and (runtime between 90 and 120) and "+
        "(titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) K, "+
        "(select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear", {}, {
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

//Graph 4.2.3

app.get('/runtimePercent120Movies', function(req, res) {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from "+ 
        "(select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and runtime > 120 and "+
        "(titleType = 'movie' or titleType = 'tvMovie') "+
        "group by startYear) K, "+
        "(select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J "+
        "where (K.startYear = J.startYear) "+
        "order by K.startYear", {}, {
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