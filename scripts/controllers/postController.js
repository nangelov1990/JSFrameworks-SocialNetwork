"use strict";

SocialNetwork.controller('postController', function ($scope, $route, postServices) {
    $scope.posts = {};

    $scope.posts.addNewPostToUserWall = function (username, postContent) {
        var postData = {
            postContent: postContent,
            username: username
        };

        // TODO: finish new post;
        postServices.addNewPost(postData)
            .then()
    };

    $scope.posts.likePost = function (postId) {
        postServices.likePost(postId)
            .then(function (data) {
                console.log(data);
                $route.reload(); // TODO: fix reload();
            }, function (err) {
                console.error(err);
            });
    };

    $scope.posts.unlikePost = function (postId) {
        postServices.unlikePost(postId)
            .then(function (data) {
                $route.reload() // TODO: fix reload();
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };
});