'use strict';

angular.module("Stubtrax").controller("WelcomeCtrl", function($scope, AuthFactory, $location){
  
  $scope.logout = () => {
    console.log("scope account?", $scope.account);
    AuthFactory.logoutUser($scope.account).then((user) => {
      console.log("logged out", user);
      $location.path("/login");
    });
  };

  $scope.go = function ( path ) {
    $location.path( path );
  };

});
