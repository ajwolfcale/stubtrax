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



