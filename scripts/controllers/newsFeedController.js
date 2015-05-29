"use strict";

SocialNetwork.controller('newsFeedController', function ($scope, profileServices) {
    var getNewsFeedPages = function () {
        profileServices.getNewsFeedPages()
            .then(function (serverPostData) {
                $scope.postsData = serverPostData;
            }, function (err) {
                console.error(err);
            });
    };

    var getLoggedUserFriendsPreview = function () {
        profileServices.getMyFriendsPreview()
            .then(function (data) {
                $scope.currentUser = $scope.loggedUser;
                $scope.previewFriends = data;
            }, function (err) {
                console.error(err);
            });
    };

    getLoggedUserFriendsPreview();
    getNewsFeedPages();
});