"use strict";

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        // TODO: perform cleanup
        //.when('/', {
        //    templateUrl: 'partials/homeScreen.html',
        //    controller: 'authenticationController'
        //})
        .when('/', {
            templateUrl: function () {
                if (sessionStorage['sessionToken']) {
                    return 'partials/newsFeedView.html'
                } else {
                    return 'partials/notLoggedScreen.html';
                }
            }
        })
        .when('/logout', {
            templateUrl: 'partials/notLoggedScreen.html',
            controller: 'authenticationController'
        })
        .when('/users/:username', {
            templateUrl: 'partials/userProfileView.html',
            controller: 'loadUserProfile'
        })
        .when('', {

        })
        .when('', {

        })
        .when('', {

        })
        .when('', {

        })
        .when('', {

        })
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});