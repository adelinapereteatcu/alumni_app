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
        .then( function (result) {
            result.records.forEach(function (record) {
                console.log("THE RESULT " + record._fields[0]);
                if (_.isEmpty(record._fields[0])) {
                    return res.status(400).json({ msg: "No such alumni in database" });
                } else {
                    session
                        .run("MATCH (a:Alumni {cnp:{cnp}, " +
                            "first_name:{first_name}, " +
                            "last_name:{last_name}," +
                            "graduation_year:{graduation_year}}) " +
                            "CREATE (a)-[:IS_REGISTERED]->(u:User {cnp:{cnpParam}, " +
                            "first_name:{first_nameParam}, " +
                            "last_name:{last_nameParam}," +
                            "graduation_year:{graduation_yearParam}})",
                            {
                                cnp: cnp,
                                first_name: first_name,
                                last_name: last_name,
                                graduation_year: graduation_year,
                                cnpParam: cnp,
                                first_nameParam: first_name,
                                last_nameParam: last_name,
                                graduation_yearParam: graduation_year,
                            })
                        .then(function (result) {
                            res.sendStatus(200);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            })
            
        })

})


module.exports = route;