'use strict';
(function () {
    angular.module('myApp.login')
        .controller('LoginController', 
                    ['$scope', '$http', '$rootScope', '$window', '$cookies', function ($scope, $http, $rootScope, $window, $cookies) {
            $scope.user = {
                login: 'Elon',
                password: 'qqq'
            };

            $scope.postLogin = function () {
                $http.post('/login', $scope.user).then(function successCallback(response) {
                    if (response.data.success) {
                        $window.location.href = '/#/';
                        $rootScope.$emit('rootScope.emit');
                        $cookies.put('token', response.data.token);
                        $cookies.put('userId', response.data.id);
                        $rootScope.user = {
                            id: response.data.id
                        };
                    }
                }, function errorCallback(err) {
                    console.log('error: ' + err);
                });
            };
        }]);
})();
