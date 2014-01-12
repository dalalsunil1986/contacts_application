/**
 *
 * Conrtact HeaderMenuView
 *
 * Renders dashboard navigation bar
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'text!templates/contactheader/header.html',
    'app',
    'http',
    'backboneBUI'
], function (Marionette, HeaderTemplate, App, Http) {

    return Marionette.ItemView.extend({
        //template for this view
        template: HeaderTemplate,
        /**
         * setup events
         */
        events: {
            'click #nav-logout': 'logout'
        },
        initialization: function () {
             _.bindAll(this, 'logout');
        },
        /**
         * load required js files before rendering the view
         */
        beforeRender: function () {
            Backbone.BUI.Loader.load([Backbone.BUI.Loader.bootstrapDropdown], Backbone.BUI.Config.BOOTSTRAP);
        },
        logout: function () {
            var username = this.model.get('username');
            var isauthenticated = this.model.get('isauthenticated');
            var model = new Backbone.Model();
            model.url = Http.createUrl('Home/LogOff');
            model.save(
                     {
                         isauthenticated: isauthenticated
                     },
                     {
                         success: function (data) {
                             if (data) {
                                 model.set(data);
                                 var isauthenticated = model.get("isauthenticated");
                                 if (!isauthenticated) {
                                     App.router.navigate('index', { trigger: true });
                                 }
                             }
                         }

                     }
                 );
        }
    });
});