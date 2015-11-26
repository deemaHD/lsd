'use strict';

(function () {
    angular.module('myApp.registration').directive('uniqueName', function ($http) {
        var toId;
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngModel, function (value) {
                    if (toId) clearTimeout(toId);
                    
                    toId = setTimeout(function () {
                        $http.get('/unique?login=' + value).success(function (data) {
                            if (data.unique === true) {
                                ctrl.$setValidity('uniqueName', true);
                            } else if (data.unique === false) {
                                ctrl.$setValidity('uniqueName', false);
                            }
                        }).error(function (data, status, headers, config) {
                           console.log('something wrong'); 
                        });
                    }, 200);
                })
            }
        }
    });
    
    angular.module('myApp.registration').directive('ngFocus', [function() {
        var FOCUS_CLASS = "ng-focused"; 
        return { 
            restrict: 'A', 
            require: 'ngModel', 
            link: function(scope, element, attrs, ctrl) { 
                ctrl.$focused = false; 
                element.bind('focus', function(evt) { 
                    element.addClass(FOCUS_CLASS); 
                    scope.$apply(function() { 
                        ctrl.$focused = true; 
                    }); 
                }).bind('blur', function(evt) {
                    element.removeClass(FOCUS_CLASS); 
                    scope.$apply(function() { 
                        ctrl.$focused = false; 
                    }); 
                });
            }
    } }]);

})();