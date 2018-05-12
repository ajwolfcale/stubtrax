'use strict';

angular.module("Stubtrax").controller("WelcomeCtrl", function($scope, AuthFactory, $location){
  $scope.message= "Welcome to Stubtrax. Login or Register as a new user.";

  // TODO: if you get to use charts, add them to this welcome page

  $scope.logout = () => {
    console.log("scope account?", $scope.account);
    AuthFactory.logoutUser($scope.account).then((user) => {
      console.log("logged out bitches!!!!", user);
      $location.path("/");
    });
  };

});
