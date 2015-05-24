"use strict";

SocialNetwork.controller('commentController', function ($scope, $route, commentServices) {
    $scope.comments = {};

    $scope.comments.print = function () {
        console.log($scope.comments.showAddForm);
    }

    $scope.comments.likeComment = function (postId, commentId) {
        commentServices.likeComment(postId, commentId)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (err) {
                console.error(err);
            });
    };

    $scope.comments.unlikeComment = function (postId, commentId) {
        commentServices.unlikeComment(postId, commentId)
            .then(function (data) {
                $route.reload()
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.comments.addCommentToPost = function (postId, data) {
        var commentContent = {
            commentContent: data
        };

        commentServices.addCommentToPost(postId, commentContent)
            .then(function (data) {
                console.log(data);
                $scope.comments.showAddForm = false;
                $route.reload();
            }, function (err) {
                console.error(err);
            });
    };

    $scope.comments.editComment = function (postId, commentId, data) {
        var commentContent = {
            commentContent: data
        };

        commentServices.editComment(postId, commentId, commentContent)
            .then(function (data) {
                console.log(data);
                $route.reload();
            }, function (err) {
                console.error(err);
            });
    };
})
