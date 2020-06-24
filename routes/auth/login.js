var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

route.post('/login', function (req, res) {
    var user_email = req.body.user_email;
    var password = req.body.password;

    console.log(user_email);
    console.log(password);

    const key = config.get('jwtSecret');

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
                return res.status(400).json({msg:'user does not exist'});
            }
            result.records.forEach(function (record) {
                if (record._fields[0] != null) {
                    bcrypt.compare(password, record._fields[0].properties.password)
                        .then(isMatch => {
                            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                            jwt.sign(
                                { id: record._fields[0].identity.low },
                                config.get('jwtSecret'),
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
                    // jwt.sign({ email: email }, key, (err, token) => {
                    //     res.json({
                    //         token: token
                    //     })

                    // })

                }
            })
            // result.records.forEach(function (record) {
            //     console.log(record._fields[0]);
            //     res.send(record._fields[0]);
            // });
            // session.close();
        })
        .catch(function (error) {
            console.log(error);
        });
});

// //get user data from token thanks to the id
// route.get('/login/user', auth, function (req, res) {
//     const id = req.user.id;
//     session
//         .run("MATCH (n:Student) WHERE id(n)=toInt({idParam}) RETURN n", { idParam: id })
//         .then(function (result) {
//             var studentsArr = [];
//             result.records.forEach(function (record) {
//                 studentsArr.push({
//                     id: record._fields[0].identity.low,
//                     name: record._fields[0].properties.name,
//                     surname: record._fields[0].properties.surname,
//                     date_of_birth: record._fields[0].properties.date_of_birth,
//                     email: record._fields[0].properties.email,
//                     gender: record._fields[0].properties.gender, 
//                 })
//                 //console.log(record._fields[0]);
//             });
//             res.status(200).json({
//                 studentsArr
//             });
//         })
// });

module.exports = route;