'use strict';

angular.module("Stubtrax").controller("ExpenseCtrl", function($scope, $location, FBStorageFactory) {

  $scope.go = function ( path ) {
    $location.path( path );
  };
  
  let receiptButton = document.getElementById('receiptAdder');
  
  // let storage = firebase.storage();
  let file;
  let storageRef;
  let uploader = document.getElementById('uploader');

  receiptButton.addEventListener('change', function (event) {
    file = event.target.files[0];
    storageRef = firebase.storage().ref(file.name);
    FBStorageFactory.pushImage(event, uploader);
    console.log("YOOOOOOOO: ", file.name);
  }); 

});




