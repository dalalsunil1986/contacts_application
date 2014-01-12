/**
 * Multiple Contacts Page View
 *
 * Renders multiple contacts page
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
     'backboneMarionette',
     'views/contacts/itemview',
     'text!templates/contacts/masterpage.html',
     'views/contactheader/header',
     'app',
     'http',
], function (Marionette, itemContactView, masterTemplate, HeaderMenuView, App, Http) {

    return Marionette.CompositeView.extend({
        tagName: "table",
        template: masterTemplate,
        itemView: itemContactView,
        initialize:function(){
            var contacts = this.model.get("contacts");
            this.collection = new Backbone.Collection(contacts)
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.$("#contacts").append(itemView.el);
        },
        beforeRender: function () {
            //renders the header menu
          
            var options = this.model.get("options");
            var model = new Backbone.Model();
            model.set(options);

            var username = model.get("username");
            var isauthenticated = model.get("isauthenticated");

            var headerMenuView = new HeaderMenuView({
                model: new Backbone.Model({
                    username: username,
                    isauthenticated: isauthenticated
                 })
            });
            App.menuRegion.show(headerMenuView);
       },

    });

});
