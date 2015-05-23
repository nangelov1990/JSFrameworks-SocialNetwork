"use strict";

SocialNetwork.factory('profileServices', function (baseServiceUrl, restServices) {
    var service = {},
        serviceUrl = baseServiceUrl + 'me/';

    service.params = {};

    service.getDataAboutMe = function () {
        return restServices.get(serviceUrl);
    };

    service.editProfile = function (data) {
        return restServices.update(serviceUrl, data);
    };

    service.changeMyPassword = function (data) {
        var url = serviceUrl + 'ChangePassword'

        return restServices.update(url, data);
    };

    service.getMyFriends = function () {
        var url = serviceUrl + 'friends'

        return restServices.get(url);
    };

    service.getMyFriendsPreview = function () {
        var url = serviceUrl + 'friends/preview'

        return restServices.get(url);
    };
    
    service.getNewsFeedPages = function () {
        var url = serviceUrl + 'feed?StartPostId&PageSize=5';

        return restServices.get(url);
    };
    
    service.getFriendRequests = function () {
        var url = serviceUrl + 'requests'

        return restServices.get(url);
    };

    service.approveFriendRequest = function (requestId) {
        var url = serviceUrl + 'requests/' + requestId + '?status=approved';

        return restServices.update(url);
    };

    service.rejectFriendRequest = function (requestId) {
        var url = serviceUrl + 'requests/' + requestId + '?status=rejected';

        return restServices.update(url);
    };

    service.sendFriendRequest = function (username) {
        var url = serviceUrl + 'requests/' + username;

        return restServices.save(url);
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
    service.setParams();

    return service;
});