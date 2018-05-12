'use strict';

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

// module.exports.getExpenses = (req, res, next) => {
//   const { Expense } = req.app.get('models');
//   let userExpenses;
//   Expense.findAll({
//     where: {
//       user_id: req.user.id
//     }
//   })
//     .then(expenses => {
//       userExpenses = expenses.map(expense => {
//         return {
//           writeoff: expense.writeoff,
//           business: expense.business,
//           merchant: expense.merchant,
//           date: expense.date,
//           total: expense.total,
//           receipt: expense.receipt,
//           notes: expense.notes
//         };
//       });
//     })   
//     .catch(err => {
//       console.log('Something went wrong', err);
//       res.status(500).json({ error: err });
//     });
// };

module.exports.getExpenses = (req, res, next) => {
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
