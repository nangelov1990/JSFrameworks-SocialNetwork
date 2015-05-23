"use strict";

SocialNetwork.controller('authenticationController', function ($scope, authenticationService) {
    $scope.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
                authenticationService.setCredentials(serverData);
                console.log(serverData);
            }, function (err) {
                console.error(err.error_description);
            })
    };
});