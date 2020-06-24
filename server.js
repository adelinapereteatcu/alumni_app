const express = require("express");
var path = require('path');
var logger = require('morgan');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors = require('cors');
const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

var home = require("./routes/getStudents");
app.use("/", home);
var add = require("./routes/addStudent");
app.use("/", add);
var register = require("./routes/auth/register");
app.use("/", register);
var login = require("./routes/auth/login");
app.use("/", login);
var upload = require("./routes/upload");
app.use("/", upload);
var getUsers = require("./routes/getUsers");
app.use("/", getUsers);
var getAlumni = require("./routes/getAlumni");
app.use("/", getAlumni);
var search = require("./routes/search");
app.use("/", search);
var getAlumniByYear = require("./routes/getAlumniByYear");
app.use("/", getAlumniByYear);
var event = require("./routes/addEvent");
app.use("/", event);
var getEvents = require("./routes/getEvents");
app.use("/", getEvents);

app.listen(9000);
console.log('Server started on port 9000');

module.exports = app;
