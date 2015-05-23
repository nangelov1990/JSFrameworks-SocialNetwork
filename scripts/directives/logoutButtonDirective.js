"use strict";

SocialNetwork.directive('logoutButtonDirective', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/logoutButton.html',
        controller: 'authenticationController'
    };
});
