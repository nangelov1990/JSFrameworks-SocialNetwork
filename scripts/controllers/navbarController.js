"use strict";

SocialNetwork.controller('navbarController', function ($scope, profileServices) {
    $scope.profile = {};
    $scope.profile.myUsername = sessionStorage['username'];

    var loadCurrentUserInfo = function () {
        if (sessionStorage['loggedUserData']) {
            $scope.loggedUser = JSON.parse(sessionStorage['loggedUserData']);
        } else {
            profileServices.getDataAboutMe()
                .then(function (serverData) {
                    $scope.loggedUser = serverData;

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

    $scope.profile.approveFriendRequest = function () {
        // TODO
    };

    loadCurrentUserInfo();
});
