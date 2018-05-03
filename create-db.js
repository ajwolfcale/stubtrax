'use strict';

let models = require("./server/models");
let { categories } = require('./server/seeders/categories');


models.sequelize.sync({force: true})
  .then( () => {
    return models.User.create({
      username: "a",
      email: "a@a.com",
      password: "a"
    });
  })
  .then(() => {
    return models.Category.bulkCreate(categories);
  })
  .then( () => {
    process.exit();
  });

// TODO: Build category model
  


