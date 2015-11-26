'use strict';
(function () {
    angular.module('myApp.category', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/category/:name', {
                templateUrl: 'js/category/category.view.html',
                controller: 'categoryCtrl'
            });
        }]);
})();