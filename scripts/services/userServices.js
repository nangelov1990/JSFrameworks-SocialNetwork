"use strict";

SocialNetwork.factory('userServices', function ($resource) {
    var resource = $resource(
        baseServiceUrl + 'users/',
        { id: '@id' },
        { update: {
                method: 'PUT'
            }
        });
})