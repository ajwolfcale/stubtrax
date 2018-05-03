'use strict';

angular.module("Stubtrax").controller("WelcomeCtrl", function($scope, AuthFactory, $location){
  $scope.message= "Welcome to Stubtrax. Login or Register as a new user.";

  $scope.logout = () => {
    console.log("scope account?", $scope.account);
    AuthFactory.logoutUser($scope.account).then((user) => {
      console.log("logged out bitches!!!!", user);
      $location.path("/");
    });
  };

});
