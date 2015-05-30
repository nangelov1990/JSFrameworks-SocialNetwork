"use strict";

SocialNetwork.controller('profileController', function ($scope, profileServices) {
    $scope.profile = $scope.profile || {};

    $scope.profile.changeMyPassword = function () {
        var data = {
            oldPassword: $scope.changePasswordData.oldPassword,
            newPassword: $scope.changePasswordData.newPassword,
            confirmPassword: $scope.changePasswordData.confirmNewPassword
        };

        profileServices.changeMyPassword(data)
            .then(function (serverMessage) {
                // TODO: notify
            }, function (err) {
                console.error(err);
            })
            .finally(function () {
                $scope.changePasswordData = {};
            });
    };

    $scope.profile.approveFriendRequest = function () {
        // TODO
    };
});