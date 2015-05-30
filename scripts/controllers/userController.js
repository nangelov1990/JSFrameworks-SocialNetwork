"use strict";

SocialNetwork.controller('userController', function ($scope, $location, $routeParams, userServices) {
    $scope.user = $scope.user || {};

    $scope.user.overUser = function () {
        console.log('over user')
    };

    $scope.user.searchUsersByName = function (name) {
        if (!name.isEmpty()) {
            userServices.searchUsersByName(name)
                .then(function (serverData) {
                    $scope.user.foundUsers = serverData;
                    console.log($scope.user.foundUsers);
                }, function (err) {
                    console.error(err);
                });
        };

        $scope.user.foundUsers = {};
        console.log('FOUND USERS:');
        console.log($scope.user.foundUsers);
    };
});