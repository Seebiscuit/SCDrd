define(['app', 'marionette', 'templates', 'moment'],
    function (app, Marionette, templates, moment) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.blog.post,

            //tagName: '',

            className: 'entry clearfix',

            ui: {
                deletePost: '.delete-post'
            },

            events: {
                'click @ui.deletePost': 'deletePost'
            },

            initialize: function () {

            },

            deletePost: function () {
                if (confirm("Are you sure you want to delete this post?"))
                    this.model.destroy();
            },

            templateHelpers: function () {
                var view = this;
                var dateVar = new Date(this.model.get('date'));
                return {
                    day: dateVar.getDate(),
                    month: moment(dateVar).format('MMM'),
                    isLoggedIn: view.isLoggedIn,
                    isAdmin: view.isAdmin
                }
            },
        });
    });