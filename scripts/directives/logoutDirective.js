"use strict";

SocialNetwork.directive('logout', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/logout-button.html',
        controller: 'authenticationController'
    };
});

