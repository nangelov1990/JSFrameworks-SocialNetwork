'use strict';

SocialNetwork.factory('notifyService', function () {
    var service = {};

    service.showInfo = function(msg) {
        noty({
            text: msg,
            type: 'success',
            layout: 'topCenter',
            timeout: 1000
        });
    };

    // Collect errors to display from the server response
    service.showError = function(msg, serverError) {
        var errors = [];

        if (serverError && serverError.error_description) {
            errors.push(serverError.error_description);
        };
        if (serverError && serverError.modelState) {
            var modelStateErrors = serverError.modelState;
            for (var propertyName in modelStateErrors) {
                var errorMessages = modelStateErrors[propertyName];
                var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                for (var i = 0; i < errorMessages.length; i++) {
                    var currentError = errorMessages[i];
                    errors.push(trimmedName + ' - ' + currentError);
                }
            }
        };
        if (errors.length > 0) {
            msg = msg + "<br>" + errors.join("<br>");
        };

        noty({
                text: msg,
                type: 'error',
                layout: 'topCenter',
                timeout: 5000}
        );
    };

    return service;
});