'use strict';

const { Router } = require('express');
const router = Router();
const { 
  postExpense, 
  getAllExpenses,
  findExpense,
  deleteExpense
} = require('../controllers/expenseCtrl.js');

router.post('/add-expense', postExpense);
router.get('/getAllExpenses', getAllExpenses);
router.get('/findExpense', findExpense);
router.get('/deleteExpense/:id', deleteExpense);


module.exports = router;

