/**
 * ModalPageView
 *
 * Renders Modal Upload
 * @author Joel Capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'text!templates/uploadmodal/page.html',
    'http',
    'jqueryFileUpload'
], function (Marionette, UploadTemplate, Http) {

    return Marionette.ItemView.extend({
        template: UploadTemplate,
        events: {
            'click #drop a': 'showdialog'
        },
        initialize: function () {
            _.bindAll(this, 'showdialog', 'upload');
        },
        onRender: function () {
            this.$('#upload').attr('action', Http.createUrl('Home/Upload'));
            this.$('input[name=contactid]').val(this.model.get('contactid'));
            this.upload();
        },
       showdialog: function () {
            $('#drop a').parent().find('input').click();
        },
        //the upload function
       upload: function () {
            var that = this;
            this.$('#upload').fileupload({
              
                dropZone: this.$('#drop'),
                add: function (e, data) {
                    console.debug(data);
                   
                    var jqXHR = data.submit().done(function (data) {
                        if (data) {
                            var model = new Backbone.Model();
                            model.set(data);
                            that.model.set({imageurl:model.get('imageurl')});
                        }

                    });
                },
             
            });

        },
    });

});
