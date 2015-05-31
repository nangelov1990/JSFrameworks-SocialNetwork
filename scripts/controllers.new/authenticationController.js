"use strict";

SocialNetwork.controller('authenticationController', function ($scope, $location, $route, authenticationService) {
    $scope.authentication = $scope.authentication || {};

    var loggedUser = function (serverData) {
        $scope.loginData = {};

        authenticationService.setCredentials(serverData);
        $location.path('#/');
    };
    var logoutUser = function () {
        $scope.loggedUser = {};
    };

    $scope.authentication.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
                console.log(serverData);
                loggedUser(serverData);
            }, function (err) {
                console.error(err.error_description);
            });
    };

    $scope.authentication.registerUser = function () {
        authenticationService.register($scope.registerData)
            .then(function (serverData) {
                loggedUser(serverData);
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.authentication.logout = function () {
        authenticationService.logout()
            .then(function () {
                logoutUser();
            }, function (err) {
                console.error(err.message);
            })
            .finally(function () {
                authenticationService.clearCredentials();
                $location.path('#/');
            });
    };

    console.log('authenticationController');
});
