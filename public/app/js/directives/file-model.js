'use strict';
angular.module('myApp')
    .directive('fileModel', ['$parse', function($parse){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                var reader = new FileReader(),
                    file = element[0].files[0];

                reader.onload = function () {
                    scope.$apply(function(){
                        modelSetter(scope, reader.result);
                    })
                };
                reader.readAsDataURL(file);


            })
        }
    }
}]);