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

// On a page refresh, the currentUser we set in the auth factory is lost, since it's just a variable. We need to be able to ask the backend for the user it has stored in session so we can reestablish who our current user is. Below, we listen for a route change and call a method that will ping the backend for the logged-in user, then broadcast that information via a custom event to the listening controllers ( see the test controller and the movie controller)
angular
  .module("Stubtrax")
  .run(($rootScope, $location, $route, $window, AuthFactory) => {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthFactory.setUserStatus().then(() => {
        console.log("user", AuthFactory.getCurrentUser());
        console.log("next", next);
        AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
      });
    });
  });
