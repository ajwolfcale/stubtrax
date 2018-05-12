'use strict';
const sequelize = require('sequelize');
// TODO: 
// Year + Month + Category: count the total for each category 
// Year + Month +  Category + Tax Write off : to show the total amount spent in each category by month
// Year + Month +  Category + Tax Write off + bizz exp: to show the total amount spent in each category by month

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


// GETS ALL USER EXPENSES between 2 selected dates
module.exports.getDateExpenses = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["2018-01-01 00:00:00-06", "2018-01-31 00:00:00-06"] }
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

// GETS ALL USER EXPENSES between 2 selected dates that are tax write-offs
module.exports.getWriteOffs = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["2018-01-01 00:00:00-06", "2018-01-31 00:00:00-06"] },
      writeoff: true
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

// GETS ALL USER EXPENSES between 2 selected dates that are tax business expenses
module.exports.getBusiness = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["2018-01-01 00:00:00-06", "2018-01-31 00:00:00-06"] },
      business: true
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


// GETS ALL USER EXPENSES between 2 selected dates that are tax business tax write-offs
module.exports.getBizWrite = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["2018-01-01 00:00:00-06", "2018-01-31 00:00:00-06"] },
      business: true,
      writeoff: true
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

// GETS ALL USER EXPENSES between 2 selected dates in a given category
module.exports.getCategory = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["1111-11-11 00:09:24-05:50:36", "2018-02-22 00:00:00-06"] },
      category_id: "4"
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

// GETS ALL USER EXPENSES between 2 selected dates in a given category that are tax write-offs
module.exports.getCatWriteOff = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["1111-11-11 00:09:24-05:50:36", "2018-02-22 00:00:00-06"] },
      category_id: "4",
      writeoff: true
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

// GETS ALL USER EXPENSES between 2 selected dates in a given category that are business expenses
module.exports.getBizCats = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["1111-11-11 00:09:24-05:50:36", "2018-02-22 00:00:00-06"] },
      category_id: "4",
      business: true
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
module.exports.getBizWriteCats = (req, res, next) => {
  const { Expense } = req.app.get('models');
  let Op = sequelize.Op;
  Expense.findAll({
    where: {
      user_id: req.user.id,
      date: { [Op.between]: ["1111-11-11 00:09:24-05:50:36", "2018-02-22 00:00:00-06"] },
      category_id: "4",
      business: true,
      writeoff: true
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


