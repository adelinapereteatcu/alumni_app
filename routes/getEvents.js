var express = require('express');
var route = express.Router();
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
const auth = require('../middleware/auth');

//get all events route 
route.get('/event', auth, function (req, res) {
    session
        .run("MATCH (e:Event) RETURN e")
        .then(function (result) {
            var allEvents = [];
            result.records.forEach(function (record) {
                allEvents.push({
                    id: record._fields[0].identity.low,
                    event_name: record._fields[0].properties.event_name,
                    location: record._fields[0].properties.location,
                    timestamp: record._fields[0].properties.timestamp,
                    description: record._fields[0].properties.description,
                })
            });
            res.json({
                allEvents
            });
        })
        .catch(function (error) {
            console.log(error);
        })
})


module.exports = route;