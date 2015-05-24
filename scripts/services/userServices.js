"use strict";

SocialNetwork.factory('userServices', function (baseServiceUrl, restServices) {
    var service = {},
        serviceUrl = baseServiceUrl + 'users/';

    service.getUserPreviewData = function (username) {
        var url = serviceUrl + username + '/preview';

        return restServices.get(url);
    };

    service.getUserFullData = function (username) {
        var url = serviceUrl + username;

        return restServices.get(url);
    };

    service.searchUsersByName = function (name) {
        var url = serviceUrl + 'search?searchTerm=' + name;

        return restServices.get(url);
    };

    service.getFriendWallByPages = function (username) {
        var url = serviceUrl + username + '/wall?StartPostId&PageSize=5';

        return restServices.get(url);
    };

    service.getFriendDetailedFriendsList = function (username) {
        var url = serviceUrl + username + '/friends';

        return restServices.get(url);
    };

    service.getFriendPreviewFriendsList = function (username) {
        var url = serviceUrl + username + '/friends/preview';

        return restServices.get(url);
    };

    // TODO: check functionality
    service.setParams = function (startPostId, pageSize) {
        service.params.StartPostId = startPostId || null;
        service.params.PageSize = pageSize || 5;
    };

    // TODO: check functionality
    service.clearParams = function () {
        service.params.StartPostId = null;
    };

    // TODO: check functionality
    //service.setParams();

    return service;
});