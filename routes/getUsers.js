var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const auth = require('../middleware/auth');

//register request route 
route.get('/getUsers', auth, (req, res) => {
    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403);
    //     }
    //     else {
    session
        .run("MATCH (a:Alumni)--(:User) return a")
        .then(function (result) {
            var users = [];
            result.records.forEach(function (record) {
                users.push({
                    id: record._fields[0].identity.low,
                    cnp: record._fields[0].properties.cnp,
                    first_name: record._fields[0].properties.first_name,
                    last_name: record._fields[0].properties.last_name,
                    graduation_year: record._fields[0].properties.graduation_year,
                    bachelor_thesis: record._fields[0].properties.bachelor_thesis
                })
                console.log(record._fields[0]);
            });
            res.status(200).json({
                users
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;