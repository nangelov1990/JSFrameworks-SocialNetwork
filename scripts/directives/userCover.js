"use strict";

SocialNetwork.directive('userCover', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/userCover.html',
        scope: {
            cover: '='
        }
    };
});
