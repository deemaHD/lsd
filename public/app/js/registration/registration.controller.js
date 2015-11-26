'use strict';
(function () {
    angular.module('myApp.registration')
        .controller('RegistrationController', ['$scope', '$http', function($scope, $http) {
        $scope.user = {
            login: '',
            password: '',
            phone: '',
            email: ''
        };

        $scope.postUser = function () {
            $http.post('/registration', $scope.user);
        };
    }]);
})();