"use strict";

SocialNetwork.factory('usersData', function ($resource) {
    var resource = $resource(
        baseServiceUrl + 'users/',
        { id: '@id' },
        { update: {
                method: 'PUT'
            }
        });
})