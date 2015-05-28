"use strict";

SocialNetwork.directive('posts', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/posts.html',
        controller: 'postController'
    };
});
