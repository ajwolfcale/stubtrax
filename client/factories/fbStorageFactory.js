'use strict';

angular
  .module("Stubtrax")
  .factory("FBStorageFactory", function($q, $http) { 
    // *+*+*+*+*+*+*+* FIREBASE CALL TO ADD RECEIPT IMAGES *+*+*+*+*+*+*+*
    let storage = firebase.storage();
    let pushImage = (file) => {
      let storageRef = storage.ref(file.name);
      return storageRef.put(file);
    };

    // *+*+*+*+*+*+*+* SERVER CALL TO ADD EXPENSES *+*+*+*+*+*+*+*
    let sendExpense = (expense) => {
      console.log("Expense Factory:  ", expense);
      return $http.post(`/add-expense`, expense)
        .then(console.log(expense));
    };


    // *+*+*+*+*+*+*+* SERVER CALLS TO GET EXPENSES *+*+*+*+*+*+*+*

    // Gets all user expenses
    let getAllUserExpenses = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getAllExpenses', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user filter requests and passes request to server 
    let findExpense = (expense) => {
      return $q(function (resolve, reject) {
        let noTimeDate1 = expense.date1.toUTCString();
        let noTimeDate2 = expense.date2.toUTCString();
        console.log("are you there?");
        $http.get(`/findExpense?date1=${noTimeDate1}&date2=${noTimeDate2}&category_id=${expense.category_id}&business=${expense.business}&writeoff=${expense.writeoff}`)
          .then(function (expenses) {
            console.log('DATA : ', expenses);
            resolve(expenses);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };
    
    return { 
      pushImage, 
      sendExpense, 
      getAllUserExpenses,
      findExpense
    };
    
  });
    