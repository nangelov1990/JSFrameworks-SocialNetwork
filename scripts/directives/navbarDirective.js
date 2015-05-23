"use strict";

SocialNetwork.directive('navbarDirective', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/loggedUserNavigation.html',
        controller: 'navbarController'
    };
});
