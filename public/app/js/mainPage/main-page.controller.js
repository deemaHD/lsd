'use strict';
(function () {
    angular.module('myApp.mainPage')
        .controller('mainPageCtrl', ['$scope', 'Item', function($scope, Item) {
            $scope.categories = [
                {name: 'children', description: 'Детский мир', img: 'baby.jpg'},
                {name: 'transport', description: 'Транспорт', img: 'car.jpg'},
                {name: 'work', description: 'Работа', img: 'job.jpg'},
                {name: 'animals', description: 'Животные', img: 'pet.jpg'},
                {name: 'house&garden', description: 'Дом и сад', img: 'garden.jpg'},
                {name: 'digital', description: 'Электроника', img: 'phone.jpg'}
            ];

            $scope.items = Item.getList().$object;
        }]);
})();