"use strict";

SocialNetwork.controller('profileController', function ($scope, profileServices) {
    $scope.profile = $scope.profile || {};
    $scope.userEditName= JSON.parse(sessionStorage['loggedUserData']).name;

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

    $scope.profile.editProfile = function () {
        var user = $scope.loggedUser,
            data = {
                name: $scope.userEditName,
                email: user.email,
                profileImageData: user.newProfileImageData || user.profileImageData || '',
                coverImageData: user.newCoverImageData || user.coverImageData || '',
                gender: user.gender
            };

        user.newProfileImageData ?
            user.profileImageData = user.newProfileImageData :
            null;
        user.newCoverImageData ?
            user.coverImageData = user.newCoverImageData :
            null;
        profileServices.editProfile(data)
            .then(function (serverData) {
                console.log(serverData); //TODO: nofity

                $scope.userEditName !== user.name ?
                    user.name = $scope.userEditName :
                    null;
                user.newProfileImageData ?
                    user.profileImageData = user.newProfileImageData :
                    null;
                user.newCoverImageData ?
                    user.coverImageData = user.newCoverImageData :
                    null;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.deleteUserPhoto = function () {
        $scope.loggedUser.profileImageData = '';
        $scope.loggedUser.newProfileImageData = undefined;
        $('#photo-input').val('');
    };

    $scope.profile.deleteUserCover = function () {
        $scope.loggedUser.coverImageData = '';
        $scope.loggedUser.newCoverImageData = undefined;
        $('#cover-input').val('');
        $('#cover-img').attr('src', null);
    };
});