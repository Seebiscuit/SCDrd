define(['app', 'marionette', 'templates', 'user-login'],
    function (app, Marionette, templates, login) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.nav,

            attributes: {
                id: 'header-wrap'
            },

            ui: {
                links: 'ul.links',
                linkBlog: '#nav-link-blog',
                linkAboutMe: '#nav-link-about-me',
                linkWorkWithMe: '#nav-link-work-with-me',
                linkLogIn: '#nav-login .nav-logged-out',
                linkLogOut: '#nav-login .nav-logged-in'
            },

            events: {
                'click @ui.linkBlog': 'goToPage',
                'click @ui.linkAboutMe': 'goToPage',
                'click @ui.linkWorkWithMe': 'goToPage',
                'click @ui.linkLogIn': 'goToPage',
                'click @ui.linkLogOut': 'logOut'
            },

            initialize: function () {

            },

            goToPage: function navGotoPage (e) {
                e.stopPropagation();
                var $target = $(e.currentTarget);
                if ($target.is(this.ui.linkBlog)) location = '#blog';
                else if ($target.is(this.ui.linkAboutMe)) location = '#about';
                else if ($target.is(this.ui.linkWorkWithMe)) location = '#work';
                else if ($target.is(this.ui.linkLogIn)) location = '#login';

                this.setActive($target);
            },

            setActive: function navSetActive($target) {
                this.ui.links.find('li.current').removeClass('current');
                $target.addClass('current');
            },

            logOut: function showLogin(e) {
                login.logout();
            },

            templateHelpers: function () {
                var view = this;
                return {
                    isLoggedIn: view.isLoggedIn,
                    isAdmin: view.Admin,
                    userName: login.get('username')
                }
            }
        });
    });