"use strict";

SocialNetwork.controller('profileController', function ($scope, baseServiceUrl, restServices) {
    $scope.getNewsFeedPages = function () {
        var serviceUrl = baseServiceUrl + 'me/feed?StartPostId&PageSize=5',
            headers = getHeaders();

        return restServices.get(serviceUrl, headers)
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };
});