var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
require("dotenv").config();

route.post('/login', function (req, res) {
    var user_email = req.body.user_email;
    var password = req.body.password;

    console.log(user_email);
    console.log(password);

    const key = process.env.JWT_SECRET;

    //simple validation
    if (!user_email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    session
        .run("MATCH (u:User {user_email:{emailParam}}) RETURN u",
            { emailParam: user_email })
        .then(function (result) {
            if (_.isEmpty(result.records)) {
                console.log(result.records);
                console.log("User doesn't exist")
                return res.status(400).json({ msg: 'user does not exist' });
            }
            result.records.forEach(function (record) {
                if (record._fields[0] != null) {
                    bcrypt.compare(password, record._fields[0].properties.password)
                        .then(isMatch => {
                            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                            jwt.sign(
                                { id: record._fields[0].identity.low },
                                key,
                                { expiresIn: 3600 }, //the token will last for an hour
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: (record._fields[0])
                                    })
                                }
                            )
                        })
                }
            })
        })
        .catch(function (error) {
            console.log(error);
        });
});

//get user data from token using the id
route.get('/user', auth, function (req, res) {
    console.log(req.user);
    const id = req.user.id;
    session
        .run("MATCH (u:User) WHERE id(u)=toInt({idParam}) RETURN u", { idParam: id })
        .then(function (result) {
            var user = [];
            result.records.forEach(function (record) {
                user.push({
                    id: record._fields[0].identity.low,
                    first_name: record._fields[0].properties.first_name,
                    last_name: record._fields[0].properties.last_name,
                    bachelor_thesis: record._fields[0].properties.bachelor_thesis,
                    user_email: record._fields[0].properties.user_email,
                    cnp: record._fields[0].properties.cnp,
                    graduation_year: record._fields[0].properties.graduation_year
                })
                console.log(record._fields[0]);
            });
            res.status(200).json({
                user
            });
        })
});

module.exports = route;