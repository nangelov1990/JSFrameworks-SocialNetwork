"use strict";

SocialNetwork.controller('userController', function ($scope, $routeParams, userServices, profileServices) {
    $scope.userProfile = $scope.userProfile || {};
    $scope.user = $scope.user || {};

    $scope.userProfile.getUserFullData = function (username) {
        userServices.getUserFullData(username)
            .then(function (serverData) {
                $scope.currentUser = serverData;
                var myProfile = $scope.currentUser.id === $scope.loggedUser.id;

                if (myProfile) {
                    $scope.currentUser = $scope.loggedUser;
                } else {
                    var invalidPhoto = ($scope.currentUser.profileImageData !== null &&
                        $scope.currentUser.profileImageData.indexOf('data:image/jpeg;base64,') === -1 &&
                        $scope.currentUser.profileImageData.indexOf('data:image/jpg;base64,') === -1 &&
                        $scope.currentUser.profileImageData.indexOf('data:image/png;base64,') === -1),
                        invalidCover = ($scope.currentUser.coverImageData !== null &&
                        $scope.currentUser.coverImageData.indexOf('data:image/jpeg;base64,') === -1 &&
                        $scope.currentUser.coverImageData.indexOf('data:image/jpg;base64,') === -1 &&
                        $scope.currentUser.coverImageData.indexOf('data:image/png;base64,') === -1);

                    if (invalidPhoto) {
                        $scope.currentUser.profileImageData = "data:image/jpeg;base64," + $scope.currentUser.profileImageData;
                    };

                    if (invalidCover) {
                        $scope.currentUser.coverImageData = "data:image/jpeg;base64," + $scope.currentUser.coverImageData;
                    };
                };

                console.log($scope.currentUser);
                if ($scope.currentUser.isFriend || myProfile) {
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
                $scope.currentUser.previewFriends = serverData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.userProfile.getUserFullData($routeParams.username);
    $scope.userProfile.getFriendWallByPages($routeParams.username);

    $scope.user.searchUsersByName = function (name) {
        if (!name.isEmpty()) {
            userServices.searchUsersByName(name)
                .then(function (serverData) {
                    $scope.user.foundUsers = serverData;
                    console.log($scope.user.foundUsers);
                }, function (err) {
                    console.error(err);
                });
        };
    };

    // TODO: Profile controller
    $scope.userProfile.sendFriendRequest = function (username) {
        profileServices.sendFriendRequest(username)
            .then(function (serverData) {
                console.log(serverData);
                $scope.currentUser.hasPendingRequest = true;
            }, function (err) {
                console.error(err);
            });
    };

    console.log('userController');
});