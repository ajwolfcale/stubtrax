'use strict';

const { Router } = require('express');
const router = Router();
const { postExpense } = require('../controllers/expenseCtrl.js');

router.post('/add-expense', postExpense);

module.exports = router;
