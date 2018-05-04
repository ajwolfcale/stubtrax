'use strict';

angular.module("Stubtrax").controller("ExpenseCtrl", function($scope, $location) {
  // TODO: connect to Firebase and send images here.....
  $scope.go = function ( path ) {
    $location.path( path );
  };
});
