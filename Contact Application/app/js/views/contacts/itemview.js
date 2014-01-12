/**
 * Item View
 *
 * Renders single contact page to be rendered inside the master view
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
     'backboneMarionette',
     'text!templates/contacts/itemview.html',
     'models/contact',
     'app',
     'http'
], function (Marionette, ItemContactTemplate, modelContact, App, Http) {
   return Marionette.ItemView.extend({
        template: ItemContactTemplate,
        tagName: 'div',
        className: 'row span clearfix',
        events: {
            'click button.btn[name=edit]': 'edit',
            'click button.btn[name=delete]': 'delete'
        },
        initialize: function () {
          _.bindAll(this,'edit','delete','error'); //bind all the events to the view
        },
        edit: function (e) {
            e.preventDefault();
            var id = this.model.get('contactid');
            App.router.navigate('contact/' + id, { trigger: true });
        },
        delete: function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to delete ' + this.model.get('firstname') + ' ?')) {
                var that = this;
                var id = this.model.get('contactid');
                this.model.url = Http.createUrl('Home/Delete');
                this.model.save({
                    isError: false,
                    relationship: null
                }, {
                    wait: true,
                    success: function (data) {
                        if (data) {
                            var data = that.model.toJSON();
                            if (!that.model.get("isError")) {
                                App.router.navigate("index", { trigger: true });
                            }
                            else {
                                that.error(that.model.get("isError"));
                            }
                        }
                    }
                })
              
            }else{
                return false;
            }
            
        },
        error: function (response) {
            if (response) {
                var alertModal = new Backbone.BUI.Modal({
                    ctype: Backbone.BUI.Config.Modal.ERROR,
                    header: 'Error',
                    cancelLabel: 'Close',
                    body: response,
                    backdrop: false,
                    keyboard: false
                });
                alertModal.render();
            }
        }
    });

});
