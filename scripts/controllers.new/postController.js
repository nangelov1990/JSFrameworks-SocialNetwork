"use strict";

SocialNetwork.controller('postController', function ($scope, $route, postServices) {
    $scope.posts = $scope.posts || {};

    $scope.posts.addNewPostToUserWall = function (username, postContent) {
        var postData = {
            postContent: postContent,
            username: username
        };

        postServices.addNewPost(postData)
            .then(function (serverData) {
                $scope.postsData.unshift(serverData);

                delete $scope.posts.newPostContent;
            }, function (err) {
                console.error(err)
            });
    };

    $scope.posts.deletePost = function (postId) {
        postServices.deletePostById(postId)
            .then(function (data) {
                var post = $scope.postsData
                        .filter(function (post) {
                            return post.id === postId;
                        })[0],
                    indexOfPost = $scope.postsData.indexOf(post);

                $scope.postsData.splice(indexOfPost, 1);

                // TODO: notify service, remove log;
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.posts.editPost = function (postId, data) {
        var postContent = {
            postContent: data
        };

        postServices.editPostById(postId, postContent)
            .then(function (data) {
                console.log(data);

                var post = $scope.postsData
                        .filter(function (post) {
                            return post.id === postId;
                        })[0],
                    editElementId = '#edit-post_' + postId + '-text';

                post.postContent = data.content;
                $scope.posts.showEditForm = false;
                delete $scope.post.editPostContent;
            }, function (err) {
                console.error(err);
            });
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

    console.log('postController');
});
