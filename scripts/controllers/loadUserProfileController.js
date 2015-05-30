"use strict";

SocialNetwork.controller('loadUserProfileController', function ($scope, $routeParams, userServices, profileServices) {
    $scope.userProfile = $scope.userProfile || {};

    $scope.userProfile.getUserFullData = function (username) {
        userServices.getUserFullData(username)
            .then(function (serverData) {
                $scope.currentUser = serverData;

                if ($scope.currentUser.profileImageData === null) {
                    $scope.currentUser.profileImageData = "/img/defaultavatar.png";
                } else if ($scope.currentUser.profileImageData.indexOf('data:image/jpg;base64,') === -1) {
                    $scope.currentUser.profileImageData = "data:image/jpg;base64," + $scope.loggedUser.profileImageData;
                };

                if ($scope.currentUser.coverImageData === null) {
                    $scope.currentUser.coverImageData = "/img/defaultcover.jpg";
                } else if ($scope.currentUser.coverImageData.indexOf('data:image/jpg;base64,') === -1) {
                    $scope.currentUser.coverImageData = "data:image/jpg;base64," + $scope.loggedUser.coverImageData;
                };

                console.log($scope.currentUser);
                if ($scope.currentUser.isFriend) {
                    $scope.userProfile.getFriendPreviewFriendsList($routeParams.username);
                };
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

    $scope.userProfile.sendFriendRequest = function (username) {
        profileServices.sendFriendRequest(username)
            .then(function (serverData) {
                console.log(serverData);
                currentUser.hasPendingRequest = true;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.userProfile.getUserFullData($routeParams.username);
    $scope.userProfile.getFriendWallByPages($routeParams.username);
});