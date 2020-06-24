var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

route.post('/search', function (req, res) {
    var n = req.body.name;

    session
        .run("MATCH (u:User {first_name:{nameParam}}) RETURN u", { nameParam: n })
        .then(function (result) {
            var resultArr = [];

            result.records.forEach(function (record) {
                if (record._fields[0] != null) {
                    resultArr.push({
                        id: record._fields[0].identity.low,
                        cnp: record._fields[0].properties.cnp,
                        first_name: record._fields[0].properties.first_name,
                        last_name: record._fields[0].properties.last_name,
                        graduation_year: record._fields[0].properties.graduation_year,
                        email: record._fields[0].properties.email,
                        bachelor_thesis: record._fields[0].properties.bachelor_thesis
                    });
                }
            });
            resultArr.forEach(function (value) {
                //console.log(value);
            });
            res.json({
                resultArr
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})

module.exports = route;