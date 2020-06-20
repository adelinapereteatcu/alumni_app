var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const auth = require('../middleware/auth');

//register request route 
route.get('/getAlumni', auth, function (req, res) {

    session
        .run("MATCH (a:Alumni)"+
        "WHERE NOT (a)-[:IS_REGISTERED]-(:User) return a")
        .then(function (result) {
            var alumni = [];
            result.records.forEach(function (record) {
                alumni.push({
                    id: record._fields[0].identity.low,
                    cnp: record._fields[0].properties.cnp,
                    first_name: record._fields[0].properties.first_name,
                    last_name: record._fields[0].properties.last_name,
                    graduation_year: record._fields[0].properties.graduation_year,
                    email: record._fields[0].properties.email,
                    bachelor_thesis: record._fields[0].properties.bachelor_thesis
                })
                console.log(record._fields[0]);
            });
            res.json({
                alumni
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;