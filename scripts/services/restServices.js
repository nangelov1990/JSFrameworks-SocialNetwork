"use strict";

SocialNetwork.factory('restServices', function ($http, $q) {
    var service = {};

    service.get = function (url, headers) {
        return requester('GET', url, headers);
    };

    service.update = function (url, data, headers) {
        return requester('PUT', url, headers, data);
    };

    service.save = function (url, data, headers) {
        return requester('POST', url, headers, data);
    };

    service.remove = function (url, data, headers) {
        return requester('DELETE', url, headers, data);
    };

    function requester(method, url, headers, data) {
        var defer = $q.defer();

        $http({
            url: url,
            method: method,
            headers: headers,
            data: data
        })
        .success(function (data, status, headers, config) {
            defer.resolve(data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
            defer.reject(data, status, headers, config);
        });

        return defer.promise;
    };

    return service;
});