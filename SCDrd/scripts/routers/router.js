define(['marionette'], function (Marionette) {
    'use strict';

    return Marionette.AppRouter.extend({
        appRoutes: {
            '': 'showHome',
            'home': 'showHome',
            'login': 'getLoggedIn'
        },

        onRoute: function (routeName, routePath, routeArgs) {
            var pathEnd = routePath.indexOf('/');
            this.trigger.apply(this, ['on:route:' + routePath.substr(0, pathEnd)].concat(routeArgs));

            // TODO Hash security: Check if user has permissions to execute hash
        }
    });
});