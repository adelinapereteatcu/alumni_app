var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const auth = require('../middleware/auth');

//register request route 
route.get('/getAlumniByYear', function (req, res) {

    session
        .run("MATCH (a:Alumni)" +
            "RETURN a.graduation_year as class, COUNT(a.graduation_year) as number")
        .then(function (result) {
            var resultArr = [];
            result.records.forEach(function (record) {
                resultArr.push({
                    class: record._fields[0],
                    number: record._fields[1].low
                })
                // console.log(record._fields[0]);
                // console.log(record._fields[1].low);
            })
            res.json({
                resultArr
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;