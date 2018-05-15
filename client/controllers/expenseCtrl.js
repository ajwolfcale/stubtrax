'use strict';

angular.module("Stubtrax").controller("ExpenseCtrl", function($scope, $q, $location, FBStorageFactory) {
  
  let currentUserId = null;
  
  $scope.$on("handleBroadcast", function(event, user) {
    console.log("handleBroadcast called in expenseCtrl", user);
    currentUserId = user.id;
    console.log("Current user in expenseCtrl", currentUserId);
  });

  $scope.go = function ( path ) {
    $location.path( path );
  };
  
  // FIREBASE SENDER
  let storageRef;
  
  $scope.uploadPic = function (file) {
    storageRef = firebase.storage().ref(file.name);
    FBStorageFactory.pushImage(file);
    console.log("FILE NAME: ", file.name);
    
    return $q(function (resolve, reject) {
      storageRef.getDownloadURL().then(function (url) {
        setTimeout(function () {
          console.log('firebase URL:  ', url);
          $scope.receiptUrl = url;
        }, 5000);
      });
    }).then(() => {
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
    });
  }; 

  $scope.addExpense = () => {
    $scope.newExpense.receipt = $scope.receiptUrl;
    // console.log("NEW EXPENSE  :", $scope.newExpense);
    FBStorageFactory.sendExpense($scope.newExpense);
  };

  $scope.loadAllExpenses = () => {
    console.log("button press", $scope.expense);
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
    console.log("button press", $scope.expense);
    FBStorageFactory.findExpense($scope.expense).then(expenses => {
      const expenseList = expenses.data.map(expense => {
        if (expense.receipt === null) expense.receipt = "/images/no-image.png";
        expense.date = expense.date.length > 10 ? `${expense.date.slice(0, 10)}` : expense.date;
        return expense;
      });
      $scope.expenses = expenseList;
    });
  };


//   // Get Expenses between 2 dates
//   $scope.searchExpenseDate = () => {
//     FBStorageFactory.getExpensesByDate($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Get Expenses between 2 dates that are tax writeoffs
//   $scope.searchExpenseWriteoffs = () => {
//     FBStorageFactory.getWriteOffs($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Get Expenses between 2 dates that are business expenses
//   $scope.searchExpenseWriteoffs = () => {
//     FBStorageFactory.getWriteOffs($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Get Expenses between 2 dates that are business expenses
//   $scope.searchBusinessExpenses = () => {
//     FBStorageFactory.getBusiness($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Get Expenses between 2 dates that are business tax write-offs
//   $scope.searchBusinessWriteoffs = () => {
//     FBStorageFactory.getBizWrite($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Gets all category expenses between dates
//   $scope.searchExpCats = () => {
//     FBStorageFactory.getCategory($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Gets all user category expenses between dates + tax writeoffs
//   $scope.searchCatWriteOffs = () => {
//     FBStorageFactory.getCatWriteOff($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Gets all user expenses between dates by category that are business expenses
//   $scope.searchBizCats = () => {
//     FBStorageFactory.getBizCats($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };

//   // Gets all user expenses between dates by category that are business writeoffs
//   $scope.searchBizWriteCats = () => {
//     FBStorageFactory.getBizWriteCats($scope.expense)
//       .then(expenses => {
//         console.log('NEW LOG: ', expenses);
//       });
//   };
});





