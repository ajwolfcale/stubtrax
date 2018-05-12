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

  // All Expenses by User Id
  $scope.searchForExpenses = () => {
    console.log('button pressed');
    FBStorageFactory.getAllUserExpenses()
      .then(expenses => {
        $scope.expenseList = Object.values(expenses);
        return $scope.expenseList;
      });
    console.log('results:  ', $scope.expenseList);
  };


  // Get Expenses between 2 dates
  $scope.searchExpenseDate = () => {
    console.log('button pressed');
    FBStorageFactory.getExpensesByDate()
      .then(expenses => {
        $scope.dateList = Object.values(expenses);
        return $scope.dateList;
      });
    console.log('results:  ', $scope.dateList);
  };

  // Get Expenses between 2 dates that are tax writeoffs
  $scope.searchExpenseWriteoffs = () => {
    console.log('button pressed');
    FBStorageFactory.getWriteOffs()
      .then(expenses => {
        $scope.writeOffList = Object.values(expenses);
        return $scope.writeOffList;
      });
    console.log('results:  ', $scope.writeOffList);
  };

  // Get Expenses between 2 dates that are business expenses
  $scope.searchExpenseWriteoffs = () => {
    console.log('button pressed');
    FBStorageFactory.getWriteOffs()
      .then(expenses => {
        $scope.writeOffList = Object.values(expenses);
        return $scope.writeOffList;
      });
    console.log('results:  ', $scope.writeOffList);
  };

  // Get Expenses between 2 dates that are business expenses
  $scope.searchBusinessExpenses = () => {
    console.log('button pressed');
    FBStorageFactory.getBusiness()
      .then(expenses => {
        $scope.bizzList = Object.values(expenses);
        return $scope.bizzList;
      });
    console.log('results:  ', $scope.bizzList);
  };

  // Get Expenses between 2 dates that are business tax write-offs
  $scope.searchBusinessWriteoffs = () => {
    console.log('button pressed');
    FBStorageFactory.getBizWrite()
      .then(expenses => {
        $scope.bizWriteList = Object.values(expenses);
        return $scope.bizWriteList;
      });
    console.log('results:  ', $scope.bizWriteList);
  };

  // Gets all category expenses between dates
  $scope.searchExpCats = () => {
    console.log('button pressed');
    FBStorageFactory.getCategory()
      .then(expenses => {
        $scope.catList = Object.values(expenses);
        return $scope.catList;
      });
    console.log('results:  ', $scope.catList);
  };

  // Gets all user category expenses between dates + tax writeoffs
  $scope.searchCatWriteOffs = () => {
    console.log('button pressed');
    FBStorageFactory.getCatWriteOff()
      .then(expenses => {
        $scope.catWriteList = Object.values(expenses);
        return $scope.catWriteList;
      });
    console.log('results:  ', $scope.catWriteList);
  };

  // Gets all user expenses between dates by category that are business expenses
  $scope.searchBizCats = () => {
    console.log('button pressed');
    FBStorageFactory.getBizCats()
      .then(expenses => {
        $scope.bizCatList = Object.values(expenses);
        return $scope.bizCatList;
      });
    console.log('results:  ', $scope.bizCatList);
  };

  // Gets all user expenses between dates by category that are business writeoffs
  $scope.searchBizWriteCats = () => {
    console.log('button pressed');
    FBStorageFactory.getBizWriteCats()
      .then(expenses => {
        $scope.bizCatWriteList = Object.values(expenses);
        return $scope.bizCatWriteList;
      });
    console.log('results:  ', $scope.bizCatWriteList);
  };
});






