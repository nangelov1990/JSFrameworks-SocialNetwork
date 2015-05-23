"use strict";

SocialNetwork.factory('authenticationService', function (baseServiceUrl, restServices) {
    var service ={},
        serviceUrl = baseServiceUrl + '/users/';

    var getHeaders = function() {
        var headers = {};
        if (sessionStorage['sessionToken']) {
            headers['Authorization'] = sessionStorage['sessionToken'];
        };

        return headers;
    };

    service.params = {};

    service.login = function (loginData) {
        var loginUrl = serviceUrl + 'login';

        return restServices.save(loginUrl, loginData);
    };

    service.setCredentials = function (serverData) {
        sessionStorage['sessionToken'] = serverData.token_type + ' ' + serverData.access_token;
        sessionStorage['username'] = serverData.userName;
    };

    service.clearCredentials = function () {
        sessionStorage.clear();
    };

    return service;
});
