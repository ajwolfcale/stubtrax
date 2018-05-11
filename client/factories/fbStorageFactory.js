'use strict';

angular
  .module("Stubtrax")
  .factory("FBStorageFactory", function($http) { 

    let storage = firebase.storage();

    let pushImage = (file) => {
      let storageRef = storage.ref(file.name);
      storageRef.put(file);
    };

    let sendExpense = (expense) => {
      console.log("Expense Factory:  ", expense);
      return $http.post(`/add-expense`, expense)
        .then(console.log(expense));
    };

    return { pushImage, sendExpense };
  });
