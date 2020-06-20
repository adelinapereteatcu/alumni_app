var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
const jwt = require('jsonwebtoken');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const auth = require('../middleware/auth');

//Home route
route.get('/', auth, (req, res) => {
    // jwt.verify(req.token, 'secretkey', (err, authData) => {
    //     if (err) {
    //         res.sendStatus(403);
    //     }
    //     else {
            session
                .run("MATCH (n:Student) RETURN n")
                .then(function (result) {
                    var studentsArr = [];
                    result.records.forEach(function (record) {
                        studentsArr.push({
                            id: record._fields[0].identity.low,
                            name: record._fields[0].properties.name,
                            surname: record._fields[0].properties.surname,
                            date_of_birth: record._fields[0].properties.date_of_birth,
                            gender: record._fields[0].properties.gender,
                            email: record._fields[0].properties.email
                        })
                        //console.log(record._fields[0]);
                    });
                    res.status(200).json({
                        studentsArr
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

module.exports = route;