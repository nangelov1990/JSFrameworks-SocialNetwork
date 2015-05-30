"use strict";

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: function () {
                if (sessionStorage['sessionToken']) {
                    return 'partials/news-feed.html'
                } else {
                    return 'partials/not-logged-screen.html';
                }
            }
        })
        .when('/logout', {
            templateUrl: 'partials/not-logged-screen.html',
            controller: 'authenticationController'
        })
        .when('/users/:username', {
            templateUrl: 'partials/user-profile.html',
            controller: 'loadUserProfileController'
        })
        .when('/profile', {
            templateUrl: 'partials/edit-user-profile.html',
            controller: 'profileController'
        })
        .when('/profile/password', {
            templateUrl: 'partials/edit-user-password.html',
            controller: 'profileController'
        })
        .otherwise({ redirectTo: '/' });

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});