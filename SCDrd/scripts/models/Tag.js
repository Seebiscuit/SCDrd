define(['app', 'backbone'],
    function (app, Backbone) {
        "use strict"
        return Backbone.Model.extend({
            urlRoot: '/api/Tags'  }
        })
    });