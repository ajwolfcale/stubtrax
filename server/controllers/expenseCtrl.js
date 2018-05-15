'use strict';
const sequelize = require('sequelize');


module.exports.postExpense = (req, res) => {
  console.log('req.body', req.body);
  const models = req.app.get('models');
  const { Expense } = models;
  Expense.create({
    writeoff: req.body.writeoff,
    business: req.body.business,
    merchant: req.body.merchant,
    date: req.body.date,
    total: req.body.total,
    receipt: req.body.receipt,
    notes:req.body.notes,
    user_id: req.user.id,
    category_id: req.body.category_id
  })
    .then(data => {
      console.log('NEW EXPENSE = ', data);
    })
    .catch(err => {
      res.status(500).json({ "error": err });
    });
};


// GETS ALL USER EXPENSES
module.exports.getAllExpenses = (req, res, next) => {
  const { Expense } = req.app.get('models');
  Expense.findAll({
    where: {
      user_id: req.user.id
    }
  })
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(err => {
      console.log('Something went wrong', err);
      res.status(500).json({ error: err });
    });
};

// GETS ALL USER EXPENSES
let getBool = (req, res, next) => {
  const { Expense } = req.app.get('models');
  Expense.findAll({
    where: {
      user_id: req.user.id,
      business: req.query.business,
      writeoff: req.query.writeoff
    }
  })
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(err => {
      console.log('Something went wrong', err);
      res.status(500).json({ error: err });
    });
};

// GETS ALL USER EXPENSES between 2 selected dates
let getDateExpenses = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] },
    }
  })
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(err => {
      console.log('Something went wrong', err);
      res.status(500).json({ error: err });
    });
};

let getCategoryExpenses = (req, res, next) => {
  const { Expense } = req.app.get('models');
  // let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      category_id: req.query.category_id
    }
  })
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(err => {
      console.log('Something went wrong', err);
      res.status(500).json({ error: err });
    });
};


let getBizWriteCats = (req, res, next) => {
  console.log("is getBizWriteCats getting called????");
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] },
      category_id: req.query.category_id,
      business: req.query.business,
      writeoff: req.query.writeoff
    }
  })
    .then(expenses => {
      res.status(200).json(expenses);
    })
    .catch(err => {
      console.log('Something went wrong', err);
      res.status(500).json({ error: err });
    });
};

// GETS ALL USER EXPENSES between 2 selected dates in a given category that are business tax write-offs
module.exports.findExpense = (req, res, next) => {
  console.log("req.query:  ", req.query);
  if (req.user.id && req.query.date1 && req.query.date2 && req.query.category_id && req.query.business && req.query.writeoff) {
    getBizWriteCats(req, res, next);
  } else if (req.user.id && req.query.date1 && req.query.date2 ) {
    getDateExpenses(req, res, next);
  } else if (req.user.id && req.query.category_id) {
    getCategoryExpenses(req, res, next);
  } else if (req.user_id && req.query.business && req.query.writeoff){
    getBool(req, res, next);
  } else {
    console.log('NEEEEWP');
  }  
};  



// GETS ALL USER EXPENSES between 2 selected dates that are tax write-offs
// let getWriteOffs = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       writeoff: req.query.writeoff
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };


// GETS ALL USER EXPENSES between 2 selected dates that are tax business expenses
// let getBusiness = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       business: req.query.business,
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };

// // GETS ALL USER EXPENSES between 2 selected dates that are tax business tax write-offs
// let getBizWrite = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       business: req.query.business,
//       writeoff: req.query.writeoff
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };



// // GETS ALL USER EXPENSES between 2 selected dates in a given category
// let getCategory = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       category_id: req.query.category_id
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };

// GETS ALL USER EXPENSES between 2 selected dates in a given category that are tax write-offs
// let getCatWriteOff = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       category_id: req.query.category_id,
//       writeoff: req.query.writeoff
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };

// GETS ALL USER EXPENSES between 2 selected dates in a given category that are business expenses
// let getBizCats = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let Op = sequelize.Op;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id,
//       date: { [Op.between]: [req.query.date1, req.query.date2] },
//       category_id: req.query.category_id,
//       business: req.query.business
//     }
//   })
//     .then(expenses => {
//       res.status(200).json(expenses);
//     })
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };
