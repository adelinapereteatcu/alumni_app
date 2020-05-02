var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();

//add student route 
route.post('/student/add', function (req, res) {
    var name = req.body.name;
    var surname = req.body.surname;
    var date_of_birth = req.body.date_of_birth;
    var gender = req.body.gender;
    var email = req.body.email;
    console.log(name);
    console.log(surname);
    console.log(date_of_birth);
    console.log(gender);
    console.log(email);

    session
    .run("CREATE (n:Student {name:{nameParam}, surname:{surnameParam}, date_of_birth:date({date_of_birthParam}), gender:{genderParam}, email:{emailParam}}) RETURN n", { nameParam: name, surnameParam: surname, date_of_birthParam: date_of_birth, genderParam: gender, emailParam:email })
    .then(function (result) {
        //res.redirect('/');
        //res.send(result);
        result.records.forEach(function (record) {
            console.log(record._fields[0]);
            res.send(record._fields[0]);
        });
        //res.status(201).json({result});
        session.close();
    })
        .catch(function (error) {
            console.log(error);
        });
})


module.exports = route;