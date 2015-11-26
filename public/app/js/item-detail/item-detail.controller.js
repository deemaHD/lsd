'use strict';
(function () {
    angular.module('myApp.itemDetail')
        .controller('itemCtrl', ['$scope','Item', '$routeParams', function ($scope, Item, $routeParams) {
            $scope.item = {};

            Item.one($routeParams.id).get().then(function (item) {
                var date = new Date(item.created_at);
                $scope.item = item;

                $scope.created_at = getTimeString(date);
            });

            function getTimeString (date) {
                var result,
                    options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                result =  date.getHours() + ':' + date.getMinutes() + ', ';
                result += date.toLocaleString("ru", options);

                return result;
            }



        }]);
})();