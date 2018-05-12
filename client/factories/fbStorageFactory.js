'use strict';

angular
  .module("Stubtrax")
  .factory("FBStorageFactory", function($q, $http) { 

    let storage = firebase.storage();

    let pushImage = (file) => {
      let storageRef = storage.ref(file.name);
      storageRef.put(file);
    };

    // TODO: do I need the ".then()?"
    let sendExpense = (expense) => {
      console.log("Expense Factory:  ", expense);
      return $http.post(`/add-expense`, expense)
        .then(console.log(expense));
    };

    let getAllUserExpenses = (expense) => {
      console.log('ya hearin me??????');
      return $q(function (resolve, reject) {
        $http.get('/getExpenses', expense)
          .then(function (data) {
            resolve(data);
            console.log('DATA SHIT: ', data);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    return { pushImage, sendExpense, getAllUserExpenses };
  });


// TODO: add this to get all user expenses

