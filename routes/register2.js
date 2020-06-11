var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//register request route 
route.post('/register', function (req, res) {
    var cnp = req.body.cnp;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var graduation_year = req.body.graduation_year;
    var cnp2 = req.body.cnp;
    var first_name2 = req.body.first_name;
    var last_name2 = req.body.last_name;
    var graduation_year2 = req.body.graduation_year;
    //const email = req.body.email;

    console.log(cnp);
    console.log(first_name);
    console.log(last_name);
    //console.log(email);
    console.log(graduation_year);

    //simple validation
    if (!cnp)
        return res.status(400).json({ msg: "Please enter the CNP" });
    if (!first_name)
        return res.status(400).json({ msg: "Please enter the first_name" });
    if (!last_name)
        return res.status(400).json({ msg: "Please enter the last_name" });
    // if (!email)
    //     return res.status(400).json({ msg: "Please enter the email" });
    if (!graduation_year)
        return res.status(400).json({ msg: "Please enter the graduation_year" });
    // if (!name || !surname || !date_of_birth || !email || !password || !gender){
    //     return res.status(400).json({msg: "Please enter all fields"});
    // }

    session
        .run("MATCH (a:Alumni {cnp:{cnp1}," +
            "first_name:{first_name1}," +
            "last_name:{last_name1}," +
            "graduation_year:{graduation_year1}})" +
            "WITH a " +
            "call apoc.do.when(a is not null," +
            "'MERGE (u:User {cnp:{cnp2}, " +
            "first_name:{first_name2}," +
            "last_name:{last_name2}," +
            "graduation_year:{graduation_year2}}) RETURN u', 'RETURN 0') " +
            "YIELD value " +
            "WITH a, value.u as u " +
            "MERGE (a)-[:IS_REGISTERED]-(u)",
            {
                cnp1: cnp,
                first_name1: first_name,
                last_name1: last_name,
                graduation_year1: graduation_year,
                cnp2: cnp2,
                first_name2: first_name2,
                last_name2: last_name2,
                graduation_year2: graduation_year2
            })
        .then(function (result) {
            console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        });
})


module.exports = route;