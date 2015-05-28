"use strict";

SocialNetwork.directive('comments', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/comments.html',
        controller: 'postController'
    };
});
