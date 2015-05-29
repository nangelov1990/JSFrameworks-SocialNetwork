"use strict";

SocialNetwork.directive('toggle', function(){
    return {
        restrict: 'A',
        controller: 'userController',
        templateUrl: 'partials/directives/user-profile-pop.html',
        link: function(scope, element, attrs){
            $(element).popover();
        }
    };
});
