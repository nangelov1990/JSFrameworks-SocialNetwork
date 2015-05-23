"use strict";

SocialNetwork.factory('authenticationService', function (baseServiceUrl, restServices) {
    var service = {},
        serviceUrl = baseServiceUrl + 'users/';

    service.login = function (data) {
        var url = serviceUrl + 'login';

        return restServices.save(url, data);
    };

    service.register = function (data) {
        var url = serviceUrl + 'register';

        return restServices.save(url, data);
    };

    service.logout = function () {
        var url = serviceUrl + 'logout';

        return restServices.save(url);
    }

    service.setCredentials = function (serverData) {
        sessionStorage['sessionToken'] = serverData.token_type + ' ' + serverData.access_token;
        sessionStorage['username'] = serverData.userName;
    };

    service.clearCredentials = function () {
        sessionStorage.clear();
    };

    return service;
});
