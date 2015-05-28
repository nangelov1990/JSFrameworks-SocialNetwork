"use strict";

SocialNetwork.controller('authenticationController', function ($scope, $location, $route, authenticationService, profileServices) {
    $scope.authentication = {};

    var loggedUser = function (serverData) {
        $scope.loginData = {};

        authenticationService.setCredentials(serverData);
        $route.reload();
    };
    var logoutUser = function () {
        $scope.currentUser = {};
        authenticationService.clearCredentials();
        $location.path('/');
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
            });

    };
});
