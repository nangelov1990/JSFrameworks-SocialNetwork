"use strict";

SocialNetwork.directive('navbar', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/navbar.html'
        ,
        controller: 'navbarController'
        //controller: 'profileController'
    };
});