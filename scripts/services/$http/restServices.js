"use strict";

SocialNetwork.factory('restServices', function ($http, $q) {
    var service = {};
    function getHeaders () {
        var headers = {};
        if (sessionStorage['sessionToken']) {
            headers['Authorization'] = sessionStorage['sessionToken'];
        };

        return headers;
    };

    service.get = function (url) {
        return requester('GET', url);
    };

    service.update = function (url, data) {
        return requester('PUT', url, data);
    };

    service.save = function (url, data) {
        return requester('POST', url, data);
    };

    service.remove = function (url, data) {
        return requester('DELETE', url, data);
    };

    function requester(method, url, data) {
        var defer = $q.defer(),
            headers = getHeaders();

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