"use strict";

SocialNetwork.controller('profileController', function ($scope, profileServices) {
    $scope.profile = {};
    $scope.profile.myUsername = sessionStorage['username'];

    $scope.profile.approveFriendRequest = function () {
        // TODO
    };
});