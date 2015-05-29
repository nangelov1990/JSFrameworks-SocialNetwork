"use strict";

SocialNetwork.directive('friendListPreview', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'partials/directives/friend-list-preview.html'/*,*/
        //controller: 'friendListController'
    };
});