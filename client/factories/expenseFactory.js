'use strict';

angular
  .module("Stubtrax")
  .factory("ExpenseFactory", function($q, $http, $rootScope) {
    return 
      addExpense(userObj) {
        return $q((resolve, reject) => {
          $http.post("/register", userObj).then(userData => {
            console.log("added a new user", userData);
            currentUser = userData;
            resolve(userData.data);
          }).catch(err => {
            reject(err);
          });
        });
      }
});