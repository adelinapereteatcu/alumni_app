var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//post event route 
route.post('/details', auth, function (req, res) {
    var cnp = req.body.cnp;
    var position = req.body.current_position;
    var company = req.body.company;
    var country = req.body.country;
    var city = req.body.city;

    session
        .run("MATCH (u:User {cnp:{cnp}}) " +
            "CREATE (j:CurrentJob {position:{position}, " +
            "company:{company}}) " +
            "CREATE (u)-[:IS_WORKING]->(j)" +
            "RETURN j ",
            {
                cnp: cnp,
                position: position,
                company: company
            })
        .then(function (result) {
            if (!_.isEmpty(result.records)) {

                var companyDetails = [];
                result.records.forEach(function (record) {
                    companyDetails.push({
                        position: record._fields[0].properties.position,
                        company: record._fields[0].properties.company
                    })
                });

                session
                    .run("MATCH (u:User {cnp:{cnp}}) " +
                        "CREATE (j:CurrentResidence {country:{country}, " +
                        "city:{city}}) " +
                        "CREATE (u)-[:HAS_RESIDENCE]->(j)" +
                        "RETURN j ",
                        {
                            cnp: cnp,
                            country: country,
                            city: city
                        })
                    .then(function (secondresult) {
                        var residenceDetails = [];
                        secondresult.records.forEach(function (record) {
                            residenceDetails.push({
                                country: record._fields[0].properties.country,
                                city: record._fields[0].properties.city
                            })
                        });
                        res.sendStatus(200);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;