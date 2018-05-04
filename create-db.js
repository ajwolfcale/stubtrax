'use strict';

let models = require("./server/models");
let { categories } = require('./server/seeders/categories');
let { billReimburse } = require('./server/seeders/billReimburse');



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
  .then(() => {
    return models.BillableReimbursable.bulkCreate(billReimburse);
  })
  .then( () => {
    process.exit();
  });

  


