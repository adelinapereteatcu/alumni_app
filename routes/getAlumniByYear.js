var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const salt = process.env.BCRYPT_SALT;

var apoc = require('apoc');
var variable = 'sekr37';

const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
const hashValue = hash.toString();

var query = apoc.query('CREATE (u:User {user_email:' + `"` + process.env.ADMIN_EMAIL + `"` +',' +
    'password:' + `"` + hashValue + `"` + '}) RETURN u')
console.log(query.statements) // array of statements in this query
query.exec().then(function (result) {
    console.log(JSON.stringify(result))
}, function (fail) {
    console.log(fail)
})


//register request route 
route.get('/alumniByYear', function (req, res) {

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