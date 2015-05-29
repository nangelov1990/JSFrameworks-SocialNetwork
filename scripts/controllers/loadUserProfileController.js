"use strict";

SocialNetwork.controller('loadUserProfileController', function ($scope, $routeParams, userServices) {
    $scope.userProfile = $scope.userProfile || {};

    $scope.userProfile.getUserFullData = function (username) {
        userServices.getUserFullData(username)
            .then(function (serverData) {
                $scope.currentUser = serverData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.userProfile.getFriendWallByPages = function (username) {
        userServices.getFriendWallByPages(username)
            .then(function (serverPostData) {
                $scope.postsData = serverPostData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.userProfile.getFriendPreviewFriendsList = function (username) {
        userServices.getFriendPreviewFriendsList(username)
            .then(function (serverData) {
                $scope.previewFriends = serverData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.userProfile.getUserFullData($routeParams.username);
    $scope.userProfile.getFriendWallByPages($routeParams.username);
    $scope.userProfile.getFriendPreviewFriendsList($routeParams.username);
});