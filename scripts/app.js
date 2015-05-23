"use strict";

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api/');

SocialNetwork.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'partials/loginRegisterView.html',
            controller: 'authenticationController'
        })
        .otherwise({redirectTo: '/login'});

     //$locationProvider.html5Mode(true);
});