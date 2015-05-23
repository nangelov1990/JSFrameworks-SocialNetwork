"use strict";

SocialNetwork.controller('authenticationController', function ($scope, $location, $route, authenticationService, profileServices) {
    $scope.authentication = {};

    var loadCurrentUserInfo = function () {
        profileServices.getDataAboutMe()
            .then(function (serverData) {
                $scope.currentUser = serverData;
                profileServices.getFriendRequests()
                    .then(function (serverData) {
                        $scope.currentUser['friendRequests'] = serverData || 0;
                    }, function (err) {
                        console.error(err.message);
                    });
            }, function (err) {
                console.error(err.message)
            });
    };
    var loggedUser = function (serverData) {
        $scope.loginData = {};
        authenticationService.setCredentials(serverData);
        $route.reload();
        loadCurrentUserInfo();

        $scope.authentication.loggedIn = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;

    //    TODO: redirect to news feed page
    };
    var logoutUser = function () {
        $scope.currentUser = {};
        authenticationService.clearCredentials();
        $location.path('/');

        $scope.authentication.loggedIn = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;
    };

    $scope.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
                loggedUser(serverData);
            }, function (err) {
                console.error(err.error_description);
            });
    };

    $scope.registerUser = function () {
        authenticationService.register($scope.registerData)
            .then(function (serverData) {
                loggedUser(serverData);
            }, function (err) {
                console.error(err.message);
            });
    };

    $scope.logout = function () {
        authenticationService.logout()
            .then(function () {
                logoutUser();
            }, function (err) {
                console.error(err.message);
            });

    };

    $scope.authentication.loggedIn = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;
});