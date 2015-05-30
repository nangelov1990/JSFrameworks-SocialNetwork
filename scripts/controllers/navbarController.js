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

                    if ($scope.loggedUser.profileImageData === null) {
                        $scope.loggedUser.profileImageData = "/img/defaultavatar.png";
                    } else if ($scope.loggedUser.profileImageData.indexOf('data:image/jpg;base64,') === -1) {
                        $scope.loggedUser.profileImageData = "data:image/jpg;base64," + $scope.loggedUser.profileImageData;
                    };

                    if ($scope.loggedUser.coverImageData === null) {
                        $scope.loggedUser.coverImageData = "/img/defaultcover.jpg";
                    } else if ($scope.loggedUser.coverImageData.indexOf('data:image/jpg;base64,') === -1) {
                        $scope.loggedUser.coverImageData = "data:image/jpg;base64," + $scope.loggedUser.coverImageData;
                    };

                    profileServices.getFriendRequests()
                        .then(function (serverData) {
                            $scope.loggedUser['friendRequests'] = serverData || 0;
                            sessionStorage['loggedUserData'] = JSON.stringify($scope.loggedUser);
                        }, function (err) {
                            console.error(err.message);
                        });
                }, function (err) {
                    console.error(err.message)
                });
        };

        console.log($scope.loggedUser);
    };

    $scope.profile.getFriendRequests = function () {
        profileServices.getFriendRequests()
            .then(function (serverData) {
                $scope.profile.friendRequests = serverData;
                console.log($scope.profile.friendRequests);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.approveFriendRequest = function () {
        // TODO
    };

    loadCurrentUserInfo();
});
