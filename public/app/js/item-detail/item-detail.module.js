'use strict';
(function () {
    angular.module('myApp.itemDetail', ['ngRoute'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/item/:id', {
                templateUrl: 'js/item-detail/item-detail.view.html',
                controller: 'itemCtrl'
            });
        }]);
})();