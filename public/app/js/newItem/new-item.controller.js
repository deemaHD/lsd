'use strict';
(function () {
    angular.module('myApp.newItem')
        .controller('newCtrl', ['$scope', 'Item', '$location','Upload',  function ($scope, Item, $location, Upload) {
            $scope.item = {};

            $scope.saveItem = function () {
                Item.post($scope.item)
                    .then(function (item) {
                        console.log('file upload');
                        $scope.uploadFile(item);
                    });
            };

            $scope.uploadFile = function (item) {
                var url = '/item/' + item._id + '/image';
                Upload.upload({
                    url: url,
                    file: $scope.file
                }).then(function (resp) {
                    $location.path('/');
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                });
            }

        }]);
})();