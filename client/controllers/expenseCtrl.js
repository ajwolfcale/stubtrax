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
        }, 1000);
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

});
