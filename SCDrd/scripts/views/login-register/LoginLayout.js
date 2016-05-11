define(['app', 'marionette', 'templates', 'views/login-register/Login', 'views/login-register/Register'],
    function (app, Marionette, templates, Login, Register) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.login.layout,

            className: 'container clearfix',

            regions: {
                loginRegion: '.app-login-region',
                registrationRegion: '.app-registration-region'
            },

            ui: {
                loginLink: '.app-login',
                registerLink: '.app-register',
                region: '.region'
            },

            events: {
                'click @ui.loginLink': 'showLogin',
                'click @ui.registerLink': 'showRegistration'
            },

            initialize: function () {

            },

            onRender: function loginOnRender() {
                this.showLogin(null, true);
            },

            appChange: function loginAppChange($current) {
                var hidding, showing;
                showing = this.ui.region.filter(':hidden');
                hidding = this.ui.region.filter(':visible');
                showing.toggleClass('fadeInRight fadeOutRight').removeClass('hidden');
                hidding.toggleClass('fadeInRight fadeOutRight').delay(150).addClass('hidden');
            },

            showLogin: function loginShowLogin(e, first) {
                var region = this.getRegion('loginRegion');

                if (!region.view) {
                    region.view = new Login;
                    region.show(region.view);
                }

                if (!first) this.appChange();
                else region.$el.toggleClass('fadeInRight fadeOutRight');
            },

            showRegistration: function loginShowLogin(e, first) {
                var region = this.getRegion('registrationRegion');

                if (!region.view) {
                    region.view = new Register;
                    region.show(region.view);
                }

                if (!first) this.appChange(region.$el);
                else region.$el.toggleClass('fadeInRight fadeOutRight');
            }
        });
    });