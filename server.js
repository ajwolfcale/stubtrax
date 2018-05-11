"use strict";

const express = require("express");
const app = express();

// auth stuff
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const routes = require("./server/routes");

app.set("models", require("./server/models"));

//Middleware
app.use(express.static(__dirname + "/client"));
app.use("/angular", express.static(__dirname + "/node_modules/angular/"));
app.use("/angular-route", express.static(__dirname + "/node_modules/angular-route/"));
// DATE STUFF
app.use("/angular-cuppa-datepicker", express.static(__dirname + "/node_modules/angular-cuppa-datepicker/js/"));
app.use("/ng-file-upload", express.static(__dirname + "/node_modules/ng-file-upload/dist/"));

// app.use("/angular-moment-picker", express.static(__dirname + "/node_modules/angular-moment-picker/dist/"));
// app.use("/moment", express.static(__dirname + "/node_modules/moment/min/"));
// app.use("/angular-momentjs", express.static(__dirname + "/node_modules/angular-momentjs/"));




app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

require("./server/config/passport-strat.js");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
