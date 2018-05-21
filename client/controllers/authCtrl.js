
"use strict";

angular
  .module("Stubtrax")
  .controller("AuthCtrl", function($scope, AuthFactory, $location) {
    $scope.account = {};

    $scope.go = function ( path ) {
      $location.path( path );
    };

    $scope.register = () => {
      $scope.errorMsg = "";
      if ($scope.account.password !== $scope.account.passwordConf) {
        console.log("no match");
        $scope.errorMsg =
          "Password and confirmation are not a match. Please try again";
        return null;
      }
      AuthFactory.createUser($scope.account).then(user => {
        AuthFactory.broadcastUserLogin(user);
        $location.path("/welcome"); 
      });
    };

    $scope.login = () => {
      console.log("scope account?", $scope.account);
      AuthFactory.loginUser($scope.account).then((user) => {
        console.log("logged in controller!!!!", user);
        AuthFactory.broadcastUserLogin(user);
        $location.path("/expense-search");
      });
    };
  });
