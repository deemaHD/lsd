'use strict';
(function () {
    angular.module('myApp.personal-page', ['ngRoute', 'ngCookies'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/account', {
                templateUrl: 'js/personal-page/personal-page.html',
                controller: 'PersonalPageController'
            });
        }]);
})();
