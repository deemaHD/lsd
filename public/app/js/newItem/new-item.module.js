'use strict';
(function () {
    angular.module('myApp.newItem', ['ngRoute', 'ngFileUpload'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/new', {
                templateUrl: 'js/newItem/new-item.view.html',
                controller: 'newCtrl'
            });
        }]);
})();