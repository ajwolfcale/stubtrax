'use strict';

const { Router } = require('express');
const router = Router();
const { 
  postExpense, 
  getAllExpenses,
  findExpense
} = require('../controllers/expenseCtrl.js');

router.post('/add-expense', postExpense);
router.get('/getAllExpenses', getAllExpenses);
router.get('/findExpense', findExpense);

module.exports = router;

// getDateExpenses,
// getWriteOffs,
// getBusiness,
// getBizWrite,
// getCategory,
// getCatWriteOff,
// getBizCats,
// getBizWriteCats,


// router.get('/getDateExpenses', getDateExpenses);
// router.get('/getWriteOffs', getWriteOffs);
// router.get('/getBusiness', getBusiness);
// router.get('/getBizWrite', getBizWrite);
// router.get('/getCategory', getCategory);
// router.get('/getCatWriteOff', getCatWriteOff);
// router.get('/getBizCats', getBizCats);
// router.get('/getBizWriteCats', getBizWriteCats);