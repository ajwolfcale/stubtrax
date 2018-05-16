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
  console.log("get bool getting called");
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;  
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] },
      business: req.query.business == 'undefined' ? false : req.query.business,
      writeoff: req.query.writeoff == 'undefined' ? false : req.query.writeoff
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
  console.log("getDateExpenses getting called");
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] }
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
  console.log("getBizWriteCats getting called");
  console.log('TRUE OR FALSE buesiness: ', req.query.business == 'undefined' ? false : req.query.business);
  console.log('TRUE OR FALSE writeoff: ', req.query.writeoff == 'undefined' ? false : req.query.writeoff);
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] },
      category_id: req.query.category_id,
      business: req.query.business == 'undefined' ? false : req.query.business,
      writeoff: req.query.writeoff == 'undefined' ? false : req.query.writeoff
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
  if (req.user.id && req.query.date1 && req.query.date2 && req.query.category_id != 'undefined' && (req.query.writeoff == 'true' || req.query.business == 'true')) {
    //date, category, booleans
    getBizWriteCats(req, res, next);
  } else if (req.user.id && req.query.date1 && req.query.date2 && req.query.category_id == 'undefined' && (req.query.writeoff == 'true' || req.query.business == 'true')){
    //dates, and one or both boolean
    getBool(req, res, next);
  } else if (req.user.id && req.query.date1 && req.query.date2 && req.query.category_id == 'undefined' && req.query.writeoff == 'undefined' && req.query.business == 'undefined') {
    //nothin but dates
    getDateExpenses(req, res, next);
  } else if(req.user.id && req.query.date1 && req.query.date2 && req.query.category_id != 'undefined' && req.query.writeoff == 'undefined' && req.query.business == 'undefined'){
    // dates and categories
    getCategory(req, res, next);
  } else {
    getBizWriteCats(req, res, next);
    console.log('calling getBizWriteCats 2');
  }  
};  


// // GETS ALL USER EXPENSES between 2 selected dates in a given category
let getCategory = (req, res, next) => {
  console.log("getCategory is being called");
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: [req.query.date1, req.query.date2] },
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


// DELETE EXPENSE:
module.exports.deleteExpense = (req, res, next) => {
  const { Expense } = req.app.get('models');
  Expense.destroy({
    where: { id: req.params.id }
  })
    .then(expense => {
      res.status(200).json(expense);
    })
    .catch(err => {
      console.log('There has been an ERROR', err);
      res.status(500).json({ error: err });
    });
};

// UPDATE EXPENSE:
// module.exports.updateExpense = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   Expense.destroy({
//     where: { id: req.params.id }
//   })
//     .then(expense => {
//       res.status(200).json(expense);
//     })
//     .catch(err => {
//       console.log('There has been an ERROR', err);
//       res.status(500).json({ error: err });
//     });
// };