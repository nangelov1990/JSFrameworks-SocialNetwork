"use strict";

SocialNetwork.controller('profileController', function ($scope, profileServices, commentServices) {
    $scope.profile = {};
    $scope.profile.myUsername = sessionStorage['username'];

    var loadCurrentUserInfo = function () {
        profileServices.getDataAboutMe()
            .then(function (serverData) {
                $scope.currentUser = serverData;
                profileServices.getFriendRequests()
                    .then(function (serverData) {
                        $scope.currentUser['friendRequests'] = serverData || 0;
                    }, function (err) {
                        console.error(err.message);
                    });
            }, function (err) {
                console.error(err.message)
            });
    };
    var getNewsFeedPages = function () {
        profileServices.getNewsFeedPages()
            .then(function (serverPostData) {
                serverPostData.forEach(function (post) {
                    commentServices.getPostComments(post.id)
                        .then(function (serverCommentData) {
                            serverCommentData.forEach(function (comment) {
                                var editable = comment.author.username == sessionStorage['username'];
                                console.log(editable);
                                comment['editableComment'] = editable;
                            });
                        });
                });
                $scope.profile.newsFeedPosts = serverPostData;
                console.log($scope.profile.newsFeedPosts);
            }, function (err) {
                console.error(err);
            });
    };
    var getFriendsPreview = function () {
        profileServices.getMyFriendsPreview()
            .then(function (data) {
                $scope.profile.previewFriends = data;
                console.log($scope.profile.previewFriends);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.profile.getFriendRequests = function () {
        profileServices.getFriendRequests()
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
    };

    $scope.profile.approveFriendRequest = function () {

    }

    loadCurrentUserInfo();
    getNewsFeedPages();
    getFriendsPreview();
});