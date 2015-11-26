'use strict';
(function () {
    angular.module('myApp.login', ['ngRoute', 'ngCookies'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'js/loginView/login.html',
                controller: 'LoginController'
            });
        }]);
})();
