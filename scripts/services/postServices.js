"use strict";

SocialNetwork.factory('postServices', function (baseServiceUrl, restServices) {
    var service = {},
        serviceUrl = baseServiceUrl + '/Posts/';

    service.addNewPost = function (data) {
        return restServices.save(serviceUrl, data);
    };

    service.getPostById = function (postId) {
        var url = serviceUrl + postId;

        return restServices.get(url);
    };

    service.editPostById = function (postId, data) {
        var url = serviceUrl + postId;

        return restServices.update(url, data);
    };

    service.deletePostById = function (postId) {
        var url = serviceUrl + postId;

        return restServices.remove(url);
    };

    service.getPostDetailedLikes = function (postId) {
        var url = serviceUrl + postId + '/likes';

        return restServices.get(url);
    };

    service.getPostPreviewLikes = function (postId) {
        var url = serviceUrl + postId + '/likes/preview';

        return restServices.get(url);
    };

    service.likePost = function (postId) {
        var url = serviceUrl + postId + '/likes';

        return restServices.save(url);
    };

    service.unlikePost = function (postId) {
        var url = serviceUrl + postId + '/likes';

        return restServices.remove(url);
    };

    return service;
});