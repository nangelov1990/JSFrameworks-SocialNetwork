"use strict";

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/homeScreen.html',
            controller: 'authenticationController'
        })
        .when('/logout', {
            templateUrl: 'partials/homeScreen.html',
            controller: 'authenticationController'
        })
        .otherwise({redirectTo: '/'});

    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});