"use strict";

SocialNetwork.controller('commentController', function ($scope, $route, commentServices) {
    $scope.comments = $scope.comments || {};

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
                var currentPost = $scope.postsData
                    .filter(function (post) {
                        return post.id === postId;
                    })[0];

                $scope.comments.showAddForm = false;
                currentPost.comments.push(data);
                currentPost.totalCommentsCount++;
            }, function (err) {
                console.error(err);
            });
    };

    $scope.comments.deleteComment = function (postId, commentId) {
        commentServices.deleteComment(postId, commentId)
            .then(function (data) {
                var currentPost = $scope.postsData
                    .filter(function (post) {
                        return post.id == postId;
                    })[0],
                    comment = currentPost.comments
                        .filter(function (comment) {
                            return comment.id === commentId;
                        })[0],
                    indexOfComment = currentPost.comments.indexOf(comment);

                currentPost.comments.splice(indexOfComment, 1);
                currentPost.totalCommentsCount--;

                // TODO: notify service, remove log;
                console.log(data);
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

                var currentPost = $scope.postsData
                        .filter(function (post) {
                            return post.id == postId;
                        })[0],
                    comment = currentPost.comments
                        .filter(function (comment) {
                            return comment.id === commentId;
                        })[0],
                    editElementId = '#edit-comment_' + commentId + '-text';

                comment.commentContent = data.commentContent;
                $scope.comments.showEditForm = false;
                delete $scope.comments.editCommentContent;
            }, function (err) {
                console.error(err);
            });
    };
})
