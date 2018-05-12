'use strict';

const { Router } = require('express');
const router = Router();
const { 
  postExpense, 
  getExpenses 
} = require('../controllers/expenseCtrl.js');

router.post('/add-expense', postExpense);
router.get('/getExpenses', getExpenses);


module.exports = router;
