define(['app', 'backbone'],
    function (app, Backbone) {
        "use strict"
        return Backbone.Model.extend({
            urlRoot: '/api/Posts',

            validate: function (attrs, options) {
                var errors = {};
                if (!attrs.title) errors.title = true;
                if (!attrs.post1) errors.post1 = true;
                if (attrs.Tags && !_.isArray(attrs.Tags)) errors.Tags = true;

                if (_.any(errors, function (error) {
                        return error;
                })) return errors;
            }
        })
    });