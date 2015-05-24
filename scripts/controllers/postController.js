"use strict";

SocialNetwork.controller('postController', function ($scope, $route, postServices) {
    $scope.posts = {};

    $scope.posts.likePost = function (postId) {
        postServices.likePost(postId)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (err) {
                console.error(err);
            });
    };

    $scope.posts.unlikePost = function (postId) {
        postServices.unlikePost(postId)
            .then(function (data) {
                $route.reload()
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };
});