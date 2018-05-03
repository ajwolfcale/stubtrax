'use strict';

module.exports.postExpense = (req, res) => {
  const models = req.app.get('models');
  const { Expense } = models;
  Expense.create({
    merchant: req.body.merchant,
    date: req.body.date,
    total: req.body.total,
    writeOff: req.body.writeOff,
    receipt: req.body.receipt,
    notes:req.body.notes,
    user_id: req.user.id
  })
    .then(data => {
      console.log('NEW EXPENSE = ', data);
    })
    .catch(err => {
      res.status(500).json({ "error": err });
    });
};


