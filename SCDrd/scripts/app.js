define(['marionette', 'radio.shim'], function (Marionette) {
    var app = new Marionette.Application();

    app.getApiRoot = '/api/';

    app.adminUserId = 'kaganasg@gmail.com'

    return app;
});