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
                        sessionStorage['currentUser'] = JSON.stringify($scope.currentUser);
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

    $scope.authentication.loginUser = function () {
        authenticationService.login($scope.loginData)
            .then(function (serverData) {
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

    $scope.authentication.loggedIn = (sessionStorage['sessionToken'] && sessionStorage['username']) ? true : false;
    (sessionStorage['currentUser']) ? $scope.currentUser = JSON.parse(sessionStorage['currentUser']) : $scope.currentUser = undefined;
});