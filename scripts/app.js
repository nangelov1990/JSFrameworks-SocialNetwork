"use strict";

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: function () {
                if (sessionStorage['sessionToken']) {
                    return 'partials/newsFeedView.html'
                } else {
                    return 'partials/notLoggedView.html';
                }
            }
        })
        .when('/logout', {
            templateUrl: 'partials/notLoggedView.html',
            controller: 'authenticationController'
        })
        .when('/users/:username', {
            templateUrl: 'partials/userProfileView.html'
        })
        .when('/profile', {
            //template: 'EDIT PROF'
            templateUrl: 'partials/editUserProfileVIew.html'
        })
        .when('/profile/password', {
            templateUrl: 'partials/editUserPassword.html'
        })
        .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});