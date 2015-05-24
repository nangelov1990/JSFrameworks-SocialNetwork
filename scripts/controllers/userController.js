"use strict";

SocialNetwork.controller('userController', function ($scope, $location, $routeParams, userServices) {
    $scope.user = {};

    $scope.user.overUser = function () {
        console.log('over user')
    };

    $scope.user.searchUsersByName = function (name) {
        if (!name.isEmpty()) {
            userServices.searchUsersByName(name)
                .then(function (data) {
                    console.log(data);
                }, function (err) {
                    console.error(err);
                });
        }
    };

    $scope.getUserFullData = function (username) {
        userServices.getUserFullData(username)
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };
});

SocialNetwork.controller('loadUserProfile', function ($scope, $routeParams, userServices) {
    $scope.user = $scope.user || {};

    $scope.user.getUserFullData = function (username) {
        userServices.getUserFullData(username)
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.error(err);
            });
    };

    $scope.user.getUserFullData($routeParams.username);
})