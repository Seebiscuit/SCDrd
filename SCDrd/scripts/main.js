require.config({
    paths: {
        'jquery': 'vendor/jquery/dist/jquery',
        'underscore': 'vendor/underscore/underscore',
        'backbone': 'vendor/backbone/backbone',
        'marionette': 'vendor/backbone.marionette/lib/core/backbone.marionette',
        'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.radio': 'vendor/backbone.radio/build/backbone.radio',
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'radio.shim': 'vendor/backbone.radio/radio.shim',
        'radios': 'lib/radios',
        'text': 'vendor/requirejs-text/text',
        'Swiper': 'vendor/swiper',
        'moment': 'vendor/moment/min/moment.min',
        'quill': 'lib/quill-custom',
        'store': 'lib/store',
        'user-login': 'lib/user-login'
    },
    map: {
        '*': {
            'backbone.wreqr': 'backbone.radio'
        }
    },
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: ['jquery'],
        templates: ['underscore']
    },
    deps: ['jquery', 'underscore']
});

require(['app', 'backbone', 'routers/router', 'RootView', 'user-login'],
function (app, Backbone, Router, RootView, userLogin) {
    "use strict";
    app.on('before:start', function () {
        initRadio
        .then(function () {
            initSecurity(userLogin);
            
            app.appRouter = new Router({
                controller: new RootView
            });

            Backbone.history.start();
        });
    })
    app.start();
});

var initRadio = new Promise(function (resolve) { require(['radios'], resolve) });

// Add loggin-check to the base Marionette.View constructor to invoke it on all views
var initSecurity = function (userlogin) {
    var ViewConstructor = Backbone.Marionette.View;
    Backbone.Marionette.View = Backbone.Marionette.View.extend({
        constructor: function (options) {
            this.isLoggedIn = userlogin.isLoggedIn();
            this.isAdmin = userlogin.isLoggedInAdminUser();
            ViewConstructor.apply(this, arguments);
        }
    });
    var BehaviorConstructor = Backbone.Marionette.Behavior;
    Backbone.Marionette.Behavior = Backbone.Marionette.Behavior.extend({
        constructor: function (options) {
            this.isLoggedIn = userlogin.isLoggedIn();
            this.isAdmin = userlogin.isLoggedInAdminUser();
            BehaviorConstructor.apply(this, arguments);
        }
    });
};