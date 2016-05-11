define(['app', 'marionette', 'views/Nav'],
    function (app, Marionette, Nav) {
    return Marionette.LayoutView.extend({
        el: '#wrapper',

        regions: {
            nav: 'header',
            banner: '#banner',
            content: '#content',
            login: '#login'
        },

        initialize: function () {
            this.showNav();
            this.setupHandlers();
        },

        setupHandlers: function () {
            app.radios.rootChannel.reply('reload:nav', this.showNav, this);
        },

        appChange: function ($current) {
            this.$previous = this.$current;
            this.$current = $current;
            if (this.$previous)
                this.$previous.hide();
            this.$current.show();
        },

        showHome: function () {
            var region = this.getRegion('content');
            if (!region.view) {
                require(['views/main/MainContent'], _.bind(function (MainContent) {
                    this.showHomeBanner();
                    region.view = new MainContent;
                    region.show(region.view);
                    this.appChange(region.$el);
                }, this));
            }
            else
                this.appChange(region.$el);
        },

        showNav: function () {
            var navRegion = this.getRegion('nav');
            navRegion.view = new Nav;
            navRegion.show(navRegion.view);
        },

        showHomeBanner: function () {
            var region = this.getRegion('banner');
            if (!region.view) {
                require(['views/main/MainBanner'], _.bind(function (MainBanner) {
                    region.view = new MainBanner;
                    region.show(region.view);
                }, this));
            }
        },

        getLoggedIn: function () {
            var region = this.getRegion('login')
            require(['views/login-register/LoginLayout'], _.bind(function (LoginLayout) {
                this.showHomeBanner();
                region.view = new LoginLayout;
                region.show(region.view)
                this.appChange(region.$el);
            }, this));
        }

    });
})