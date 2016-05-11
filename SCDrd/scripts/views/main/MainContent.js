define(['app', 'marionette', 'templates', 'views/main/MainBlog'],
    function (app, Marionette, templates, MainBlog) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.main.mainLayout,

            regions: {
                mainContent: '.content-wrap'
            },

            ui: {

            },

            events: {
            },

            initialize: function () {

            },

            onBeforeShow: function () {
                var region = this.getRegion('mainContent');
                region.view = new MainBlog;
                region.show(region.view);
            },
        });
    });