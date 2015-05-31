"use strict";

SocialNetwork.controller('navbarController', function ($scope, profileServices) {
    $scope.profile = $scope.profile || {};

    var loadCurrentUserInfo = function () {
        if (sessionStorage['loggedUserData']) {
            $scope.loggedUser = JSON.parse(sessionStorage['loggedUserData']);
        } else {
            profileServices.getDataAboutMe()
                .then(function (serverData) {
                    $scope.loggedUser = serverData;

                    var invalidPhoto = ($scope.loggedUser.profileImageData !== null &&
                        $scope.loggedUser.profileImageData.indexOf('data:image/jpeg;base64,') === -1 &&
                        $scope.loggedUser.profileImageData.indexOf('data:image/jpg;base64,') === -1 &&
                        $scope.loggedUser.profileImageData.indexOf('data:image/png;base64,') === -1),
                        invalidCover = ($scope.loggedUser.coverImageData !== null &&
                        $scope.loggedUser.coverImageData.indexOf('data:image/jpeg;base64,') === -1 &&
                        $scope.loggedUser.coverImageData.indexOf('data:image/jpg;base64,') === -1 &&
                        $scope.loggedUser.coverImageData.indexOf('data:image/png;base64,') === -1);

                    if (invalidPhoto) {
                        $scope.loggedUser.profileImageData = "data:image/jpeg;base64," + $scope.loggedUser.profileImageData;
                    };

                    if (invalidCover) {
                        $scope.loggedUser.coverImageData = "data:image/jpeg;base64," + $scope.loggedUser.coverImageData;
                    };

                    $scope.profile.getFriendRequests();
                    sessionStorage['loggedUserData']
                }, function (err) {
                    console.error(err.message)
                });
        };

        console.log($scope.loggedUser);
    };

    $scope.profile.getFriendRequests = function () {
        profileServices.getFriendRequests()
            .then(function (serverData) {
                $scope.loggedUser['friendRequests'] = serverData || 0;
                sessionStorage['loggedUserData'] = JSON.stringify($scope.loggedUser);
                console.log($scope.profile.friendRequests);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.approveFriendRequest = function (requestId) {
        profileServices.approveFriendRequest(requestId)
            .then(function (serverData) {
                console.log(serverData);
                var newFriend = $scope.loggedUser.friendRequests
                    .filter(function (request) {
                        return request.id = requestId;
                    })[0].user;

                $scope.profile.getFriendRequests();

                $scope.friendRequestPreview = false;
                $scope.previewFriends.friends.push(newFriend);
                // TODO: Notify
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.rejectFriendRequest = function (requestId) {
        profileServices.rejectFriendRequest(requestId)
            .then(function (serverData) {
                console.log(serverData);
                $scope.profile.getFriendRequests();
                $scope.friendRequestPreview = false;
                // TODO: Notify
            }, function (err) {
                console.error(err);
            });
    };

    loadCurrentUserInfo();
    console.log('navbarController');
});
