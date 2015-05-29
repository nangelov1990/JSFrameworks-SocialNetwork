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
});