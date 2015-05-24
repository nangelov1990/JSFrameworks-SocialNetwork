"use strict";

SocialNetwork.directive('logoutDirective', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/logoutButton.html',
        controller: 'authenticationController'
    };
});

