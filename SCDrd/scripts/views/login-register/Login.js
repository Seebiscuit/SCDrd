define(['app', 'marionette', 'templates', 'user-login'],
    function (app, Marionette, templates, userLogin) {
        "use strict"
        return Marionette.LayoutView.extend({
            template: templates.login.login,

            tagName: 'form',

            className: 'nobottommargin',

            attributes: {
                //id: ''
            },

            ui: {
                username: '#app-login-form-username',
                password: '#app-login-form-password',
                loginButton: '#app-login-form-submit',
                inputs: 'input',
        },

            events: {
                'keypress @ui.inputs': 'login',
                'click @ui.loginButton': 'login',
            },

            initialize: function () {

            },

            login: function (e) {
                var username, password;
                if (e.which == 13 || e.which == 1) {
                    e.preventDefault();
                    if ((username = this.ui.username.val()) && (password = this.ui.password.val())) {
                        userLogin.login({
                            username: username,
                            password: password
                        })
                    .then(function () {
                        document.location = '#home';
                    });
                    }
                }
            }
        });
    });