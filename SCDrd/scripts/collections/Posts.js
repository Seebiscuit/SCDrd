define(['app', 'backbone', 'templates'],
    function (app, Backbone, templates) {
        "use strict"
        return Backbone.Collection.extend({
            url: '/api/Posts',

            initialize: function () {

            },
        });
    });