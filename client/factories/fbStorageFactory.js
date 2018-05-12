'use strict';

angular
  .module("Stubtrax")
  .factory("FBStorageFactory", function($q, $http) { 
    // *+*+*+*+*+*+*+* FIREBASE CALL TO ADD RECEIPT IMAGES *+*+*+*+*+*+*+*
    let storage = firebase.storage();
    let pushImage = (file) => {
      let storageRef = storage.ref(file.name);
      storageRef.put(file);
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

    // Gets all user expenses between dates
    let getExpensesByDate = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getDateExpenses', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };


    // Gets all user expenses between dates
    let getWriteOffs = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getWriteOffs', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user business expenses between dates
    let getBusiness = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getBusiness', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user business write-offs between dates
    let getBizWrite = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getBizWrite', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user business expenses between dates by category
    let getCategory = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getCategory', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user expenses between dates by category that are tax write-offs
    let getCatWriteOff = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getCatWriteOff', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user expenses between dates by category that are business expenses
    let getBizCats = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getBizCats', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    };

    // Gets all user expenses between dates by category that are business writeoffs
    let getBizWriteCats = (expense) => {
      return $q(function (resolve, reject) {
        $http.get('/getBizWriteCats', expense)
          .then(function (expense) {
            resolve(expense);
            console.log('DATA : ', expense);
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
      getExpensesByDate,
      getWriteOffs,
      getBusiness,
      getBizWrite,
      getCategory,
      getCatWriteOff,
      getBizCats,
      getBizWriteCats
    };



  });



