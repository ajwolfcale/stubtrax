'use strict';

angular.module("Stubtrax").controller("ExpenseCtrl", function($scope, $q, $route, $location, FBStorageFactory) {
  
  let currentUserId = null;
  
  $scope.$on("handleBroadcast", function(event, user) {
    // console.log("handleBroadcast called in expenseCtrl", user);
    currentUserId = user.id;
    // console.log("Current user in expenseCtrl", currentUserId);
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };
  
  // FIREBASE SENDER
  let storageRef;
  
  $scope.uploadPic = function (file) {
    storageRef = firebase.storage().ref(file.name);
    FBStorageFactory.pushImage(file).then(function () {
      // console.log("FILE NAME: ", file.name);
      return storageRef.getDownloadURL();
    }).then((url) => {
      $scope.receiptUrl = url;
      $scope.newExpense = {
        writeoff: false,
        business: false,
        merchant: "",
        date: "",
        total: "",
        notes: "",
        user_id: currentUserId,
        category_id: ""
      };
    }).catch(function (err) {
      console.log("ERROR", err);
    });
  }; 

  $scope.addExpense = () => {
    $scope.newExpense.receipt = $scope.receiptUrl;
    FBStorageFactory.sendExpense($scope.newExpense);
  };

  $scope.loadAllExpenses = () => {
    // console.log("button press", $scope.expense);
    FBStorageFactory.getAllUserExpenses($scope.expense).then(expenses => {
      const expenseList = expenses.data.map(expense => {
        if (expense.receipt === null) expense.receipt = "/images/no-image.png";
        expense.date = expense.date.length > 10 ? `${expense.date.slice(0, 10)}` : expense.date;
        return expense;
      });
      $scope.expenses = expenseList;
    });
  };

  // All Expenses by User Id
  $scope.searchForExpenses = () => {
    // console.log("button press", $scope.expense);
    FBStorageFactory.findExpense($scope.expense).then(expenses => {
      const expenseList = expenses.data.map(expense => {
        if (expense.receipt === null) expense.receipt = "/images/no-image.png";
        expense.date = expense.date.length > 10 ? `${expense.date.slice(0, 10)}` : expense.date;
        return expense;
      });
      $scope.expenses = expenseList;
    });
  };

  //DELETES AN EXPENSE
  $scope.expensesDeleter= (expense_id) => {
    FBStorageFactory.deleteOneExpense(expense_id)
      .then(() => {
        $route.reload("/#!/expense-search");
      });
  };

  //DELETES AN EXPENSE
  $scope.expensesUpdater = (expense_id) => {
    FBStorageFactory.changeAnExpense(expense_id)
      .then(() => {
        $route.reload("/#!/expense-search");
      });
  };

});





