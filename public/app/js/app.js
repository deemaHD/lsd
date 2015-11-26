'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.mainPage',
    'myApp.category',
    'myApp.login',
    'myApp.registration',
    'myApp.newItem',
    'myApp.itemDetail',
    'myApp.personal-page',
    'myApp.version'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
