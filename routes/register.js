var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'admin '));
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//add student route 
route.post('/register', function (req, res) {
    const name = req.body.name;
    const surname = req.body.surname;
    const date_of_birth = req.body.date_of_birth;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    
    console.log(name);
    console.log(surname);
    console.log(date_of_birth);
    console.log(email);
    console.log(password);
    console.log(gender);

    //simple validation
    if (!name)
        return res.status(400).json({ msg: "Please enter the name" });
    if (!surname)
        return res.status(400).json({ msg: "Please enter the surname" });
    if (!date_of_birth)
         return res.status(400).json({ msg: "Please enter the date_of_birth" });
    if (!email)
        return res.status(400).json({ msg: "Please enter the email" });
    if (!password)
        return res.status(400).json({ msg: "Please enter the password" });
    if (!gender)
        return res.status(400).json({ msg: "Please enter the gender" });
    // if (!name || !surname || !date_of_birth || !email || !password || !gender){
    //     return res.status(400).json({msg: "Please enter all fields"});
   // }

    session
    .run("MATCH (n:Student {email:{emailParam}}) RETURN n", { emailParam:email })
    .then(results => {
        if (!_.isEmpty(results.records)) {
            return res.status(400).json({msg: "email already in use"});
          }
          else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw err;
                session
                    .run("CREATE (n:Student {name:{nameParam}, surname:{surnameParam}, date_of_birth:date({date_of_birthParam}), email:{emailParam}, password:{passwordParam}, gender:{genderParam}}) RETURN n",
                {   nameParam: name, 
                    surnameParam: surname, 
                    date_of_birthParam: date_of_birth,  
                    emailParam:email,
                    passwordParam:hash,
                    genderParam: gender
                })
                .then(function (result) {
                    result.records.forEach(function (record) {
                        jwt.sign(
                            {id:  record._fields[0].identity.low},
                            config.get('jwtSecret'),
                            {expiresIn: 3600}, //the token will last for an hour
                            (err, token) =>{
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: (record._fields[0])
                                })
                            }
                        )
                    });
                    //session.close();
                }) 
                .catch(function (error) {
                    console.log(error);
                });
            });            
          }
    })   
})


module.exports = route;