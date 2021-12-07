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

app.post('/genreratings', async function(req, res) {
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
                            console.log("POST /genreratings : Connection released");
                        }
                    });
                });
        });
    });

    //Graph 1.2

app.post('/genreRatingsSeries', async function(req, res) {
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
        connection.execute(`select CAST(rohityerramsetty.title.startYear as INTEGER) AS startyear, round(avg(averagerating),5) AS averagerating from dkanchanapalli.ratings JOIN rohityerramsetty.title ON ratings.tconst = rohityerramsetty.title.tconst WHERE ratings.tconst in (SELECT tconst FROM rohityerramsetty.title where genres like '%${genre}%' and (titleType = 'tvSeries' or titletype = 'tvMiniSeries')) group by rohityerramsetty.title.startYear order by rohityerramsetty.title.startYear`, {}, {
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
                            console.log("POST /genreRatingsSeries : Connection released");
                        }
                    });
                });
        });
    });

//Graph 2.1

app.post('/episodeRatings1', async function(req, res) {
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

        const seriesName = req.body.seriesName;
        connection.execute(`select rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER) AS season,CAST(episode.episodeNumber as INTEGER) AS episodenumber, ratings.averageRating
        from
        dkanchanapalli.episode,dkanchanapalli.ratings,rohityerramsetty.title
        where
        episode.tconst = ratings.tconst
        and
        episode.parent_tconst = rohityerramsetty.title.tconst
        and title.primaryTitle like '${seriesName}'
        order by rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER), CAST(episode.episodeNumber as INTEGER)
        `, {}, {
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
                            console.log("POST /episodeRatings1 : Connection released");
                        }
                    });
                });
        });
    });
    //Graph 2.1.2
    app.post('/episodePopularity1', async function(req, res) {
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
    
            const seriesName = req.body.seriesName;
            connection.execute(`select rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER) AS season,CAST(episode.episodeNumber as INTEGER) AS episodenumber, ratings.popularity
            from
            dkanchanapalli.episode,dkanchanapalli.ratings,rohityerramsetty.title
            where
            episode.tconst = ratings.tconst
            and
            episode.parent_tconst = rohityerramsetty.title.tconst
            and title.primaryTitle like '${seriesName}'
            order by rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER), CAST(episode.episodeNumber as INTEGER)
            `, {}, {
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
                                console.log("POST /episodePopularity1 : Connection released");
                            }
                        });
                    });
            });
        });
//Graph 2.2
    app.post('/episodeRatings2', async function(req, res) {
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
            const seriesName = req.body.seriesName;
            connection.execute(`select rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER) AS season,CAST(episode.episodeNumber as INTEGER) AS episodenumber, ratings.averageRating
            from
            dkanchanapalli.episode,dkanchanapalli.ratings,rohityerramsetty.title
            where
            episode.tconst = ratings.tconst
            and
            episode.parent_tconst = rohityerramsetty.title.tconst 
            and title.primaryTitle like '${seriesName}'
            order by rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER), CAST(episode.episodeNumber as INTEGER)`, {}, {
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
                                console.log("POST /episodeRatings2 : Connection released");
                            }
                        });
                    });
            });
        });
        //Graph 2.2.1
        app.post('/episodePopularity2', async function(req, res) {
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
                const seriesName = req.body.seriesName;
                connection.execute(`select rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER) AS season,CAST(episode.episodeNumber as INTEGER) AS episodenumber, ratings.popularity
                from
                dkanchanapalli.episode,dkanchanapalli.ratings,rohityerramsetty.title
                where
                episode.tconst = ratings.tconst
                and
                episode.parent_tconst = rohityerramsetty.title.tconst 
                and title.primaryTitle like '${seriesName}'
                order by rohityerramsetty.title.primaryTitle, CAST(episode.seasonNumber as INTEGER), CAST(episode.episodeNumber as INTEGER)`, {}, {
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
                                    console.log("POST /episodePopularity2 : Connection released");
                                }
                            });
                        });
                });
            });

        //Graph 2 TITLES
         app.get('/episodeTitle', async function(req, res) {
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
            connection.execute("SELECT t.primaryTitle FROM dkanchanapalli.episode e, dkanchanapalli.ratings r, rohityerramsetty.title t WHERE e.tconst = r.tconst AND e.parent_tconst = t.tconst GROUP BY t.primaryTitle ORDER BY t.primaryTitle", {}, {
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
                                console.log("GET /episodeTitles : Connection released");
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

        connection.execute("select CAST(k.startYear as INTEGER) as year,round((k.req/J.tot * 100), 2) as percent from "+
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
                            console.log("GET /adultPercentageMovies : Connection released");
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

        connection.execute("select CAST(k.startYear as INTEGER) as year, round((k.req/J.tot * 100), 2) as percent from "+
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
                            console.log("GET /adultPercentageSeries : Connection released");
                        }
                    });
                });
        });
    });
            

//Graph 3.2.1

app.post('/adultGenrePercentMovies', function(req, res) {
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
        connection.execute(`select CAST(k.startYear as INTEGER) as year, round((k.req/J.tot * 100), 2) as percent from
        (select t.startYear, count(*) as req from rohitYerramsetty.title t where isAdult = '1' and t.genres like '%${genre}%' and (t.titleType = 'movie' or t.titleType = 'tvMovie')
        group by t.startYear) k,
        (select startYear, count(*) as tot from rohitYerramsetty.title where genres like '%${genre}%' and (titleType = 'movie' or titleType = 'tvMovie')
        group by startYear) J
        where k.startYear = j.startYear
        order by k.startYear`, {}, {
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
                            console.log("GET /adultGenrePercentMovies : Connection released");
                        }
                    });
                });
        });
    });


//Graph 3.2.2

app.post('/adultGenrePercentSeries', function(req, res) {
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
        connection.execute(`select CAST(k.startYear as INTEGER) as year, round((k.req/J.tot * 100), 2) as percent from
        (select startYear, count(*) as req from rohitYerramsetty.title where isAdult = '1' and genres like '%${genre}%' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries')
        group by startYear) k,
        (select startYear, count(*) as tot from rohitYerramsetty.title where genres like '%${genre}%' and (titleType = 'movie' or titleType = 'tvMovie')
        group by startYear) J
        where k.startYear = j.startYear
        order by k.startYear`, {}, {
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
                            console.log("GET /adultGenrePercentSeries : Connection released");
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

        connection.execute("select CAST(startYear as INTEGER) as year, round(avg(popularity),5) as popularity from rohityerramsetty.title join dkanchanapalli.ratings on rohityerramsetty.title.tconst=dkanchanapalli.ratings.tconst where isadult='1' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear order by startYear", {}, {
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

        connection.execute("select CAST(startYear as INTEGER) as year, round(avg(popularity),5) as popularity from rohityerramsetty.title join dkanchanapalli.ratings on rohityerramsetty.title.tconst=dkanchanapalli.ratings.tconst where isadult='1' and (titleType = 'movie' or titleType = 'tvMovie') group by startYear order by startYear", {}, {
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and runtime < 30 and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear)K, (select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J where (K.startYear = J.startYear) order by K.startYear", {}, {
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
                            console.log("GET /runtimePercent30Series : Connection released");
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and (runtime between 30 and 60) and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) K, (select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J where (K.startYear = J.startYear) order by K.startYear", {}, {
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
                            console.log("GET /runtimePercent30and60Series : Connection released");
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohityerramsetty.title where runtime is not null and runtime > 60 and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) K, (select startYear, count(*) as totmovies from rohityerramsetty.title where runtime is not null and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by startYear) J where (K.startYear = J.startYear) order by K.startYear ", {}, {
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
                            console.log("GET /runtimePercent60Series : Connection released");
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and runtime < 90 and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) K, (select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J where (K.startYear = J.startYear) order by K.startYear", {}, {
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
                            console.log("GET /runtimePercent90Movies : Connection released");
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and (runtime between 90 and 120) and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) K, (select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J where (K.startYear = J.startYear) order by K.startYear", {}, {
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
                            console.log("GET /runtimePercent90to120Movies : Connection released");
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

        connection.execute("select K.startYear, round((K.req/J.totmovies * 100),2) as percent from (select startYear, count(*) as req from rohitYerramsetty.title where runtime is not null and runtime > 120 and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) K, (select startYear, count(*) as totmovies from rohitYerramsetty.title where runtime is not null and (titleType = 'movie' or titleType = 'tvMovie') group by startYear) J where (K.startYear = J.startYear) order by K.startYear", {}, {
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
                            console.log("GET /runtimePercent120Movies : Connection released");
                        }
                    });
                });
        });
    });

    //Graph 4.3.1

app.post('/runtimePopularity90Movies', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where t.runtime < 90 and t.genres like '${genre}' and (titleType = 'movie' or titleType = 'tvMovie') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity90Movies : Connection released");
                        }
                    });
                });
        });
    });
//Graph 4.3.2

app.post('/runtimePopularity90to120Movies', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where (t.runtime between 90 and 120) and t.genres like '${genre}' and (titleType = 'movie' or titleType = 'tvMovie') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity90to120Movies : Connection released");
                        }
                    });
                });
        });
    });

//Graph 4.3.3

app.post('/runtimePopularity120Movies', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where t.runtime > 120 and t.genres like '%${genre}%' and (titleType = 'movie' or titleType = 'tvMovie') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity120Movies : Connection released");
                        }
                    });
                });
        });
    });


//Graph 4.4.1

app.post('/runtimePopularity30Series', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where t.runtime < 30 and t.genres like '%${genre}%' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity30Series : Connection released");
                        }
                    });
                });
        });
    });

//Graph 4.4.2

app.post('/runtimePopularity30to60Series', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where (t.runtime between 30 and 60) and t.genres like '%${genre}%' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity30to60Series : Connection released");
                        }
                    });
                });
        });
    });

//Graph 4.4.3

app.post('/runtimePopularity60Series', function(req, res) {
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
        connection.execute(`select t.startYear as year, round(avg(r.popularity),5) as popularity from dkanchanapalli.ratings r JOIN rohitYerramsetty.title t on r.tconst = t.tconst where t.runtime > 60 and t.genres like '%${genre}%' and (titleType = 'tvSeries' or titleType = 'tvMiniSeries') group by t.startYear order by t.startYear`, {}, {
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
                            console.log("POST /runtimePopularity60Series : Connection released");
                        }
                    });
                });
        });
    });
    //graph 5
    app.post('/popularLanguages', function(req, res) {
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
            const region = req.body.region;
            connection.execute(`select t.startYear as year,round(avg(r.popularity),5) as popularity from jacksonwu.basictitleinfo j, rohityerramsetty.title t, dkanchanapalli.ratings r, (select tconst from jacksonwu.basictitleinfo where region = '${region}') l where t.tconst=j.tconst and r.tconst=j.tconst and l.tconst=t.tconst group by t.startYear order by t.startYear`, {}, {
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
                                console.log("GET /language : Connection released");
                            }
                        });
                    });
            });
        });

app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port));