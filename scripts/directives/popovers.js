"use strict";

SocialNetwork.directive('toggle', function(){
    return {
        restrict: 'A',
        controller: 'userController',
        templateUrl: 'partials/directives/userProfilePop.html',
        link: function(scope, element, attrs){
            $(element).popover();
        }
    };
})
