'use strict';

const express = require('express');
const app = express();


//Middleware
app.use(express.static(__dirname + "/client"));
app.use("/angular", express.static(__dirname + "/node_modules/angular/"));
app.use("/angular-route", express.static(__dirname + "/node_modules/angular-route/"));




app.listen(3000, () => {
  console.log("server listening on port 3000");
});
