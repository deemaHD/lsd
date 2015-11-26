'use strict';
(function () {
  angular.module('myApp.mainPage', ['ngRoute', 'restangular'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'js/mainPage/main-page.html',
          controller: 'mainPageCtrl'
        });
      }])
      .factory('ItemRestangular',['Restangular', function(Restangular) {
          return Restangular.withConfig(function(RestangularConfigurer) {
              RestangularConfigurer.setRestangularFields({
                  id: '_id'
              });
          });
      }])
      .factory('Item', function(ItemRestangular) {
          return ItemRestangular.service('item');
      });
})();
