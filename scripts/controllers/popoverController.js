"use strict";

SocialNetwork.controller('popoverController', function ($scope) {
    $scope.popovers = {};

    $scope.popovers.friendRequest = {
        templateUrl: 'partials/popovers/friend-request-popover.html'
    };
});