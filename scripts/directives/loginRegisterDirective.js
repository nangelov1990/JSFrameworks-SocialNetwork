"use strict";

SocialNetwork.directive('loginRegisterDirective', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/loginRegisterView.html',
        controller: 'authenticationController'
    };
});