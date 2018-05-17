'use strict';

angular.module("Stubtrax").controller("ExpenseCtrl", function($scope, $routeParams, $q, $window, $route, $location, FBStorageFactory) {
  
  let currentUserId = null;
  $scope.newerExpense = {};
  
  $scope.$on("handleBroadcast", function(event, user) {
    // console.log("handleBroadcast called in expenseCtrl", user);
    currentUserId = user.id;
    // console.log("Current user in expenseCtrl", currentUserId);
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };

  $scope.pageRefresh = () => {
    $window.location.ref='http://localhost:3000/#!/expense-search';
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
  $scope.expensesDeleter = (expense_id) => {
    FBStorageFactory.deleteOneExpense(expense_id)
      .then(() => {
        // $route.reload();
        console.log('close modal');
        // $route.reload("/#!/expense-search");
      });
  };

  $scope.expenseEdit = (id) => {
    console.log(id);
    
    // TODO: get an expense with this id
    // put it on $scope.newerExpense
    // load newerExpense in the modal
    FBStorageFactory.getOneExpense(id)
      .then(({data}) => {
        console.log('Selected Expense ID=  ', data);
        // data.date =  data.date.slice(0, 10);
        $scope.newerExpense = {
          expense_id: data.id,
          writeoff: false,
          business: false,
          merchant: data.merchant,
          date: data.date,
          total: data.total,
          notes: data.notes,
          user_id: data.user_id,
          category_id: data.category_id
        };
        console.log('$scope.newerExpense', $scope.newerExpense);
      });
  
  };


  //UPDATES AN EXPENSE
  $scope.expensesUpdater = () => {
    console.log('HERE IS YOUR NEWER EXPENSE', $scope.newerExpense);
    // $scope.expense_id = expense_id;
    // FBStorageFactory.changeAnExpense(expense_id)
    //   .then(() => {
    //     console.log("updated");
    //   });
  };

});





