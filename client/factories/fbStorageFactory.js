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
      // console.log("Expense Factory:  ", expense);
      return $http.post(`/add-expense`, expense)
        .then(console.log(expense));
    };

    // *+*+*+*+*+*+*+* SERVER CALLS TO GET EXPENSES *+*+*+*+*+*+*+*

    let getAllUserExpenses = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getAllExpenses', expense)
          .then(function (expense) {
            resolve(expense);
            // console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // *+*+*+*+*+*+*+* SERVER CALL TO GET ONE EXPENSES *+*+*+*+*+*+*+*
    let getOneExpense = (id) => {
      return $q(function (resolve, reject) {
        $http
          .get(`/getSingleExpense/${id}`)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    // *+*+*+*+*+*+*+* SERVER CALL TO DELETE EXPENSES *+*+*+*+*+*+*+*
    let deleteOneExpense = (expense_id) => {
      return $q(function (resolve, reject) {
        $http
          .get(`/deleteExpense/${expense_id}`)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };



    // *+*+*+*+*+*+*+* SERVER CALL TO UPDATE EXPENSES *+*+*+*+*+*+*+*
    let changeAnExpense = (expense_id, expense) => {
      console.log('UPDATE COMING FROM FACTORY');
      return $q(function (resolve, reject) {
        $http
          .post(`updateExpense/${expense_id}`, JSON.stringify(expense))
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
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
            // console.log('DATA : ', expenses);
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
      findExpense,
      deleteOneExpense,
      changeAnExpense,
      getOneExpense
    };

  });

