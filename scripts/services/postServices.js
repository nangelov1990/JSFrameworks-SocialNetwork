"use strict";

SocialNetwork.factory('postServices', function ($http, baseServiceUrl) {

    var postService = {},
        postServiceUrl = baseServiceUrl + '/Posts/';

    postService.params = {};

    postService.createNewPost = function (newPostData) {
        var defer = $q.defer();

        $http.post(
            postServiceUrl,
            {
                params: this.params,
                headers: this.headers()
            },
            newPostData)
        .success(function (data, status, headers, config) {
            defer.resolve(data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
            defer.reject(data, status, headers, config);
        });

        return defer.promise;
    };

    postService.getPostById = function (postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId;

        $http.get(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.editPost = function (postId, editPostContent) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId;

        $http.put(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            },
            editPostContent)
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.deletePost = function (postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId;

        $http.delete(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.getNumberOfPostLikes = function (postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId + '/likes';

        $http.get(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.getPostLikesUsers = function (postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId + '/likes/preview';

        $http.get(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.likePost = function (postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId + '/likes';

        $http.post(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.unlikePost = function unlikePost(postId) {
        var defer = $q.defer(),
            serviceUrl = postServiceUrl + postId + '/likes';

        $http.delete(
            serviceUrl,
            {
                params: this.params,
                headers: this.headers()
            })
            .success(function (data, status, headers, config) {
                defer.resolve(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data, status, headers, config);
            });

        return defer.promise;
    };

    postService.headers = function () {
        var token = localStorage['sessionToken'] || undefined;

        return token;
    };

    postService.clearParams = function () {
        postService.params.status = null;
        postService.params.startPage = 1;
    };

    postService.clearParams();
    postService.params.pageSize = 5;

    return postService;
});