"use strict";

SocialNetwork.factory('commentServices', function ($routeParams, baseServiceUrl, restServices) {
    var service = {},
        serviceUrl = baseServiceUrl + 'posts/';

    service.getPostComments = function (postId) {
        var url = serviceUrl + postId + '/comments';

        return restServices.get(url);
    };

    service.addCommentToPost = function (postId, data) {
        var url = serviceUrl + postId + '/comments';

        return restServices.save(url, data);
    }

    service.editComment = function (postId, commentId, data) {
        var url = serviceUrl + postId + '/comments/' + commentId;

        return restServices.update(url, data);
    }

    service.likeComment = function (postId, commentId) {
        var url = serviceUrl + postId + '/comments/' + commentId + '/likes';

        return restServices.save(url);
    };

    service.unlikeComment = function (postId, commentId) {
        var url = serviceUrl + postId + '/comments/' + commentId + '/likes';

        return restServices.remove(url);
    };

    return service;
});