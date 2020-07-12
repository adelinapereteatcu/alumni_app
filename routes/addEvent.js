var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//post event route 
route.post('/event', auth, function (req, res) {
    var cnp = req.body.cnp;
    var event_name = req.body.event_name;
    var location = req.body.location;
    var description = req.body.description;

    if (!event_name || !location || !description) {
        return res.status(400).json({ msg: "Please complete all fields" });
    }

    session
        .run("MATCH (u:User {cnp:{cnp}}) " +
            "CREATE (e:Event {event_name:{event_name}, " +
            "location:{location}, " +
            "description:{description}, " +
            "timestamp:date(datetime({epochmillis:timestamp()}))}) " +
            "CREATE (u)-[:POSTED]->(e)" +
            "RETURN e ",
            {
                cnp: cnp,
                event_name: event_name,
                location: location,
                description: description
            })
        .then(function (result) {
            var events = [];
            result.records.forEach(function (record) {
                events.push({
                    event_name: record._fields[0].properties.event_name,
                    location: record._fields[0].properties.location,
                    timestamp: record._fields[0].properties.timestamp,
                    description: record._fields[0].properties.description
                })
            });
            res.json({
                events
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;