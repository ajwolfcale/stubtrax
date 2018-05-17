'use strict';

const { Router } = require('express');
const router = Router();
const { 
  postExpense, 
  getAllExpenses,
  findExpense,
  deleteExpense,
  updateExpense,
  getSingleExpense
} = require('../controllers/expenseCtrl.js');

router.post('/add-expense', postExpense);
router.get('/getAllExpenses', getAllExpenses);
router.get('/findExpense', findExpense);
router.get('/getSingleExpense/:id', getSingleExpense);
router.get('/deleteExpense/:id', deleteExpense);
router.post('/updateExpense/:id', updateExpense);



module.exports = router;

