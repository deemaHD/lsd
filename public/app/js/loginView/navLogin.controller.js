'use strict';
(function () {
    angular.module('myApp.login')
        .controller('NavLoginController', ['$scope', '$http', '$rootScope', '$cookies', function ($scope, $http, $rootScope, $cookies) {
            $scope.template = {name: 'nav-bar.html', url: './nav-bar.html'};
            
            $scope.isLogIn = ($cookies.get('token'))? true: false;
            
            $scope.getLogInStatus = function () {
                var cookieToken = $cookies.get('token') || '';
                $http.post('/me').then(function successCallback(response) {
                    if (response.data.isLogIn) {
                        $scope.isLogIn = true;
                    }
                }, function errorCallback(err) {
                    console.log('error: ' + err);
                });
            };
            
            $scope.getLogInStatus();

            $scope.logOut = function () {
                $scope.isLogIn = false;
                $cookies.put('token', '');
            };
            
            $rootScope.$on('rootScope.emit', function() {
                $scope.isLogIn = true;
            });
        }]);
})();