"use strict";

SocialNetwork.directive('userPhoto', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/userPhoto.html',
        scope: {
            photo: '='
        }
    };
});
