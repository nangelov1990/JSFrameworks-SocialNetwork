"use strict";

SocialNetwork.controller('authenticationController', function ($scope, authenticationService) {
    var loggedUser = function () {
    //    TODO: redirect to news feed page
        $scope.logged = true;

        // TODO: delete the following
        console.log($scope.logged);
    };
    var logoutUser = function () {
    //    TODO: redirect to login/reg screen
        $scope.logged = false;

        // TODO: delete the following
        console.log($scope.logged);
    };

    $scope.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
                authenticationService.setCredentials(serverData);
                loggedUser();
            }, function (err) {
                console.error(err.error_description);
            });
    };

    $scope.registerUser = function () {
        authenticationService.register($scope.registerData)
            .then(function (serverData) {
                authenticationService.setCredentials(serverData);
                loggedUser();
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.logout = function () {
        authenticationService.logout()
            .then(function () {
                authenticationService.clearCredentials();
                logoutUser();
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.logged = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;
    //$scope.logged = false;
});