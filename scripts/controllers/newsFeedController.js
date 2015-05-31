"use strict";

SocialNetwork.controller('newsFeedController', function ($scope, profileServices) {
    $scope.profile = $scope.profile|| {};

    var getNewsFeedPages = function () {
        profileServices.getNewsFeedPages()
            .then(function (serverPostData) {
                $scope.postsData = serverPostData;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.getMyFriendsPreview = function () {
        profileServices.getMyFriendsPreview()
            .then(function (data) {
                $scope.previewFriends = data;

                if ($scope.loggedUser) {
                    $scope.loggedUser.previewFriends = $scope.previewFriends;
                    $scope.currentUser = $scope.loggedUser;
                };
            }, function (err) {
                console.error(err);
            });
    };

    getNewsFeedPages();
    $scope.profile.getMyFriendsPreview();

    console.log('newsFeedController');
});