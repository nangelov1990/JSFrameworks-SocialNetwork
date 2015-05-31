"use strict";

SocialNetwork.controller('profileController', function ($scope, profileServices) {
    $scope.profile = $scope.profile || {};

    $scope.profile.loadCurrentUserInfo = function () {
        if (sessionStorage['loggedUserData']) {
            $scope.loggedUser = JSON.parse(sessionStorage['loggedUserData']);
            $scope.userEditName = JSON.parse(sessionStorage['loggedUserData']).name;
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
                }, function (err) {
                    console.error(err.message)
                });
        };

        console.log($scope.loggedUser);
    };

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

    $scope.profile.getFriendRequests = function () {
        profileServices.getFriendRequests()
            .then(function (serverData) {
                $scope.loggedUser['friendRequests'] = serverData || 0;
                $scope.userEditName = $scope.loggedUser.name;

                sessionStorage['loggedUserData'] = JSON.stringify($scope.loggedUser);

                $scope.profile.getLoggedUserFriendsPreview();
                $scope.profile.getNewsFeedPages();

                console.log($scope.profile.friendRequests);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.approveFriendRequest = function (requestId) {
        profileServices.approveFriendRequest(requestId)
            .then(function (serverData) {
                console.log(serverData);
                //var request = $scope.loggedUser.friendRequests
                //        .filter(function (request) {
                //            return request.id = requestId;
                //        })[0],
                //    indexOfRequest = $scope.loggedUser.friendRequests.indexOf(request);
                //
                //$scope.loggedUser.friendRequests.splice(indexOfRequest, 1);
                ////$scope.loggedUser.friendRequests.length--;
                $scope.profile.getFriendRequests();
                $scope.friendRequestPreview = false;
                // TODO: Notify
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.rejectFriendRequest = function (requestId) {
        profileServices.rejectFriendRequest(requestId)
            .then(function (serverData) {
                console.log(serverData);
                //var request = $scope.loggedUser.friendRequests
                //    .filter(function (request) {
                //       return request.id = requestId;
                //    })[0],
                //    indexOfRequest = $scope.loggedUser.friendRequests.indexOf(request);
                //
                //$scope.loggedUser.friendRequests.splice(indexOfRequest, 1);
                ////$scope.loggedUser.friendRequests.length--;
                $scope.profile.getFriendRequests();
                $scope.friendRequestPreview = false;
                // TODO: Notify
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.getNewsFeedPages = function () {
        profileServices.getNewsFeedPages()
            .then(function (serverPostData) {
                $scope.postsData = serverPostData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.getLoggedUserFriendsPreview = function () {
        profileServices.getMyFriendsPreview()
            .then(function (data) {
                //$scope.currentUser = $scope.loggedUser;
                //$scope.currentUser['previewFriends'] = data;

                $scope.loggedUser['previewFriends'] = data;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.loadCurrentUserInfo();

});