'use strict';

angular
  .module("Stubtrax")
  .factory("ExpenseFactory", function($q, $http, $rootScope) {    
    // return 
    //   addExpense(expObj) {
    //     return $q((resolve, reject) => {
    //       $http.post("/add-expense", expObj).then(expense => {
    //         // console.log("added an expense", expense);
    //         resolve(expense);
    //       }).catch(err => {
    //         reject(err);
    //       });
    //     });
    //   }
});