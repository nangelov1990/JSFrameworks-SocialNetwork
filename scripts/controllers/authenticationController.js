"use strict";

SocialNetwork.controller('authenticationController', function ($scope, authenticationService) {
    var loggedUser = function () {
    //    TODO: redirect to news feed page
    };
    var logoutUser = function () {
    //    TODO: redirect to login/reg screen
    };

    $scope.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
                authenticationService.setCredentials(serverData);
                loggedUser();

                // TODO: delete the following
                $scope.logged = 'LOGGED IN';
                console.log(serverData);
            }, function (err) {
                console.error(err.error_description);
            });
    };

    $scope.registerUser = function () {
        authenticationService.register($scope.registerData)
            .then(function (serverData) {
                authenticationService.setCredentials(serverData);
                loggedUser();

                // TODO: delete the following
                $scope.logged = 'REGISTERED';
                console.log(serverData);
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.logout = function () {
        authenticationService.logout()
            .then(function () {
                authenticationService.clearCredentials();
                logoutUser();

                // TODO: delete the following
                $scope.logged = 'LOGOUT';
                console.log($scope.logged);
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.loggedUser = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;
});