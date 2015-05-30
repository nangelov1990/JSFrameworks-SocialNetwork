"use strict";

SocialNetwork.directive('searchBar', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/searchBar.html',
        controller: 'userController',
        scope: {}
    };
});