'use strict';
(function () {
    angular.module('myApp.personal-page')
        .controller('PersonalPageController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
            $scope.model = {
                id: '',
                login: '',
                password: '',
                email: '',
                phone: ''
            };

            $scope.items = [];

            $scope.showSettings = true;

            $scope.switchSettings = function () {
                $scope.showSettings = true;
            };

            $scope.switchItems = function () {
                $scope.showSettings = false;
            };

            $scope.saveUserData = function () {
                $http.put('/user/' + $scope.model.id, $scope.model).then(function successCallback(response) {
                    if (response.data.success) {
                        console.log('Data changed successfully');
                    }
                }, function errorCallback(err) {
                    console.log('error: ' + err);
                });
            };

            $scope.getCurrentUser = (function () {
                $http.get('/current-user').then(function successCallback(response) {
                    var user = response.data;
                    if (user) {
                        $scope.model.id = user._id;
                        $scope.model.login = user.login;
                        $scope.model.email = user.email;
                        $scope.model.phone = user.phone;
                        console.log('1243');
                    }
                }, function errorCallback(err) {
                    console.log('error: ' + err);
                });
            })();

            $scope.getUserItems = (function () {
                $http.get('/user-items').then(function successCallback(response) {
                    var items = response.data;
                    if (items) {
                        $scope.items = items;
                    }
                }, function errorCallback(err) {
                    console.log('error: ' + err);
                });
            })();
        }]);
})();
