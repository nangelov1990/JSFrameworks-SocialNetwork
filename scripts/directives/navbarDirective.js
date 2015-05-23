"use strict";

SocialNetwork.directive('navbarDirective', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/loggedUserNavigation.html',
        controller: 'authenticationController'
    };
});
