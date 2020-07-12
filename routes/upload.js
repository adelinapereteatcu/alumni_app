var express = require('express');
var route = express.Router();
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var _ = require('lodash');
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
require("dotenv").config();
const session = driver.session();
var multer = require('multer');
var xlstojson = require('xls-to-json-lc');
var xlsxtojson = require('xlsx-to-json-lc');
var app = express();
app.use(bodyParser.json()); 
const auth = require('../middleware/auth');

var storage = multer.diskStorage({ 
    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        //file.originalname.split('.') -> [ 'Calc2020', 'xlsx' ]
    }
});
var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error("Wrong extension type"));
        }
        callback(null, true);
    }
}).single('file');

/** API path that will upload the files */
app.post('/upload', auth, function (req, res) {
    var exceltojson; //initialization
    console.log("Inside post upload route");
    upload(req, res, function (err) {
        console.log("Inside upload function");
        if (err) {
            console.log("Some error here");
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        /**Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        //start convert process
        /**check the extension of the incoming file
         * and use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            console.log("Inside try block");
            exceltojson({
                input: req.file.path, //the same path where we uploaded our file
                output: "output.json", //output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                }
                res.json({ error_code: 0, err_desc: null, data: result });

                session
                    .run("call apoc.load.json({file}) YIELD value " +
                        "MERGE (a:Alumni {cnp:value.cnp}) ON CREATE " +
                        "SET a.first_name=value.first_name, a.last_name=value.last_name,"+
                        "a.email=value.email, a.graduation_year=value.graduation_year, "+
                        "a.bachelor_thesis=value.bachelor_thesis ",
                        { file: "file:/E:/Neo4j/Alumni%20App/output.json" })
                        
                    .then(function (res) {
                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log("ERROR "+error);
                    })
            });
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corrupted excel file" })
        }
        //return res.status(200).send(req.file);
    });
});


module.exports = app;