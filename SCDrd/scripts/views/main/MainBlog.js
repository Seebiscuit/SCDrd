define(['app', 'marionette', 'templates', 'views/Blog/Posts', 'collections/Posts'],
    function (app, Marionette, templates, Blogs, Posts) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.main.mainBlog,

            regions: {
                posts: '.postcontent',
                widgets: '.sidebar-widgets-wrap',
                newPost: '.new-post-region'
            },

            className: 'container clearfix',

            attributes: {
                //id: ''
            },

            ui: {
                newPostButton: 'a.add-post'
            },

            events: {
                'click @ui.newPostButton': 'startNewPost'
            },

            initialize: function () {

            },

            onBeforeShow: function () {
                this.showPosts();
            },

            showPosts: function () {
                var region = this.getRegion('posts');
                var options = { collection: new Posts };

                options.collection.fetch().then(_.bind(function () {
                    region.view = new Blogs(options);
                    region.show(region.view);
                }, this))
            },

            startNewPost: function () {
                var options = {};
                var region = this.getRegion('posts');

                require(['views/blog/NewPost', 'collections/Tags'], _.bind(function (NewPost, Tags) {
                    options.tags = new Tags();
                    options.tags.fetch().then(_.bind(function () {
                        region.newPostView = new NewPost(options);
                        region.newPostView.render();
                        region.newPostView.triggerMethod('before:attach');
                        region.view.$el.prepend(region.newPostView.el);
                        region.newPostView.triggerMethod('attach');
                    }, this))
                }, this));
            },

            templateHelpers: function () {
                var view = this;
                return {
                    isLoggedIn: view.isLoggedIn,
                    isAdmin: view.isAdmin
                }
            }
        });
    });