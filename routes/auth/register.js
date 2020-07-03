var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register request route 
route.post('/register', function (req, res) {
    var cnp = req.body.cnp;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var graduation_year = req.body.graduation_year;
    var user_email = req.body.user_email;
    var password = req.body.password;

    const salt = process.env.BCRYPT_SALT;

    if (!first_name || !last_name || !graduation_year || !user_email || !password || !cnp) {
        return res.status(400).json({ msg: "Please complete all fields" });
    }

    session
        .run("MATCH (a:Alumni {cnp:{cnp}," +
            "first_name:{first_name}," +
            "last_name:{last_name}," +
            "graduation_year:{graduation_year}})" +
            "RETURN a ",
            {
                cnp: cnp,
                first_name: first_name,
                last_name: last_name,
                graduation_year: graduation_year
            })
        .then(function (result) {
            if (_.isEmpty(result.records)) {
                //console.log("EMPTY");
                return res.status(400).json({ msg: "No such alumni in database" });
            } else {
                result.records.forEach(function (record) {
                    console.log("THE RESULT " + record._fields[0]);
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            session
                                .run("MATCH (a:Alumni {cnp:{cnp}, " +
                                    "first_name:{first_name}, " +
                                    "last_name:{last_name}," +
                                    "graduation_year:{graduation_year}}) " +
                                    "WITH a as map " +
                                    "CREATE (map)-[:IS_REGISTERED]->(u:User )" +
                                    "SET u = map, " +
                                    "u.user_email={emailParam}, " +
                                    "u.password={passwordParam} " +
                                    "RETURN u"
                                    ,
                                    {
                                        cnp: cnp,
                                        first_name: first_name,
                                        last_name: last_name,
                                        graduation_year: graduation_year,
                                        cnpParam: cnp,
                                        first_nameParam: first_name,
                                        last_nameParam: last_name,
                                        graduation_yearParam: graduation_year,
                                        emailParam: user_email,
                                        passwordParam: hash
                                    })
                                .then(function (result) {
                                    //console.log(result);
                                    res.sendStatus(200);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        })
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;