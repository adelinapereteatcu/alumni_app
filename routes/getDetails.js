var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const auth = require('../middleware/auth');

//register request route 
route.get('/details/:cnp', auth, (req, res) => {
    const cnp = req.params.cnp;
    session
        .run("MATCH (u:User {cnp:{cnp}})-"+
        "[IS_WORKING]->(r:CurrentJob) RETURN r",
        {
            cnp:cnp
        })
        .then(function (result) {
            var currentJob = [];
            result.records.forEach(function (record) {
                currentJob.push({
                    id: record._fields[0].identity.low,
                    company: record._fields[0].properties.company,
                    position: record._fields[0].properties.position
                })
            });
            session
                .run("MATCH (u:User {cnp:{cnp}})-" +
                    "[HAS_RESIDENCE]->(r:CurrentResidence) RETURN r",
                    {
                        cnp: cnp
                    })
                .then(function (result) {
                    var currentResidence = [];
                    result.records.forEach(function (record) {
                        currentResidence.push({
                            id: record._fields[0].identity.low,
                            country: record._fields[0].properties.country,
                            city: record._fields[0].properties.city
                        })
                    });
                    res.json({
                        currentJob,
                        currentResidence
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;