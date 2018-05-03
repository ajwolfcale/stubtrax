"use strict";
// 'ui.bootstrap'
angular.module("Stubtrax", ['ngRoute']).config($routeProvider => {
  $routeProvider
    .when("/welcome", {
      templateUrl: "partials/welcome.html",
      controller: "WelcomeCtrl"
    })
    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "AuthCtrl"
    })
    .when("/register", {
      templateUrl: "partials/register.html",
      controller: "AuthCtrl"
    })
    .when("/expense", {
      templateUrl: "partials/expense.html",
      controller: "AuthCtrl"
    })
    .otherwise("/");
});

// TODO: Fix this stuff stuff to keep user logged in
// angular
// .module("Stubtrax")
// .run(($rootScope, $location, $route, $window, AuthFactory) => {
//   $rootScope.$on("$routeChangeStart", function(event, next, current) {
//     AuthFactory.setUserStatus().then(() => {
//       console.log("user", AuthFactory.getCurrentUser());
//       console.log("next", next);
//       AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
//     });
//   });
// });
