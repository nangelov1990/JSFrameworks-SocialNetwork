"use strict";

SocialNetwork.directive('userPreview', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/userPreviewData.html',
        scope: {
            user: '='
        }
    };
});
