define(['app', 'backbone', 'marionette'],
    function (app, Backbone, Mn) {
        "use strict";

        var radios, RadioCentral

        radios = {
            initialize: function () {
                app.radios = {};
                _.each(radios, function (intializer, key) {
                    if (key !== 'initialize') intializer()
                });
            },

            root: function () {
                app.radios.rootChannel = Backbone.Radio.channel('root');
            }
        };

        return (new (Mn.Object.extend(radios)));
    });