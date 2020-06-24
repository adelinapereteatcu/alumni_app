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

//post event route 
route.post('/event', auth, function (req, res) {
    var cnp = req.body.cnp;
    var event_name = req.body.event_name;
    var location = req.body.location;

    session
        .run("MATCH (u:User {cnp:{cnp}}) " +
            "CREATE (e:Event {event_name:{event_name}, " +
            "location:{location}, " +
            "timestamp:date(datetime({epochmillis:timestamp()}))}) " +
            "CREATE (u)-[:POSTED]->(e)" +
            "RETURN e ",
            {
                cnp: cnp,
                event_name: event_name,
                location: location
            })
        .then(function (result) {
            var events = [];
            result.records.forEach(function (record) {
                events.push({
                    cnp: record._fields[0].properties.cnp,
                    event_name: record._fields[0].properties.event_name,
                    location: record._fields[0].properties.location,
                    timestamp: record._fields[0].properties.timestamp
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