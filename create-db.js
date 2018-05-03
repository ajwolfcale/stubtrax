'use strict';

let models = require("./server/models");

models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create({
      username: "a",
      email: "a@a.com",
      password: "a"
    });
  })
  .then( () => {
    process.exit();
  });
