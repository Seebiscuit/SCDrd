define(['app', 'marionette', 'templates', 'views/blog/Post'],
    function (app, Marionette, templates, Post) {
        "use strict"
        return Marionette.CompositeView.extend({
            template: templates.blog.posts,

            //tagName: '',

            className: 'post-timeline clearfix',

            attributes: {
                id: 'posts'
            },

            ui: {

            },

            events: {

            },

            childView: Post,

            initialize: function () {

            },
        });
    });