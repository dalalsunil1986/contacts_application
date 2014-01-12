/**
 * Edit Page View
 *
 * Renders the edit contact form
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */

define([
    'backboneMarionette',
    'http',
    'text!templates/edit/page.html',
    'app',
    'views/uploadmodal/page',
    'backboneValidation',
    'backboneValidationBootstrap',
    'serialize',
    'backboneBUI',
 ], function (Marionette, Http, EditPageTemplate, App, UploadModalView) {
    return Marionette.ItemView.extend({
        template: EditPageTemplate,
        events: {
            'click button[name=update]': 'save',
            'click .modal-show-link a': 'openUploadModal',
        },
        initialize: function () {
            _.bindAll(this, 'save', 'error', 'openUploadModal');
            this.model.bind('change:imageurl', this.changeImage);
            Backbone.Validation.bind(this);
        },
        //save our changes to the contact model
        save: function (e) {

            e.preventDefault();
            var that = this;
            var data = this.$('form').serializeObject();
            var contactid = that.model.get("contactid");//this determine if we're updating or saving a new one
            if (!contactid || contactid === null) {
                contactid = 0;
            }
           var model = new Backbone.Model();
            model.set({ firstname: null, lastname: null, relationshipid:null, isError: false, country:null, address:null, phone:null,contactid:null,});
            if (this.model.set(data)) {//do a client side validation
                model.url = Http.createUrl('/Home/Save');
                model.save({
                    firstname:that.$('input[name=firstname]').val(),
                    lastname: that.$('input[name=lastname]').val(),
                    relationshipid: that.$('select[name=relationshipid]').val(),
                    country: that.$('input[name=country]').val(),
                    address: that.$('input[name=address]').val(),
                    phone: that.$('input[name=phone]').val(),
                    contactid: contactid,
                    
                    isError:false,
                },
                
                {
                    wait: true,
                    success: function () {
                        var data = model.toJSON();
                        if (data) {
                           model.set(data);
                          if (!model.get("isError")) {
                              App.router.navigate("contacts", { trigger: true });
                          }
                          else {
                              that.error(model.get("isError"));
                          }
                       }

                    },
                    error: function () {
                        App.router.navigate('error/500', { trigger: true })
                    }
                })
            }


        },
        changeImage: function (model) {
            var contactmodel = new Backbone.Model();
            contactmodel.url = Http.createUrl("Home/Edit/" + model.get('contactid'));//get request url
            contactmodel.fetch({
                success: function () {
                    var data = contactmodel.toJSON;
                    contactmodel.set(data);
                    $('#profile-image').attr('src', contactmodel.get('imageurl'));
                    model.set({ imageurl: contactmodel.get('imageurl') }, { silent: true });//set this model's url
                 },
                error: function () {
                    //handles server error
                    App.router.navigate('error/500', { trigger: true });
                }
            });
         },
        onRender: function () {

            var that = this;
            var isEditing = false; //check if where in edit or add mode

            var contactid = that.model.get("contactid");
           
            if (contactid && parseInt(contactid) > 0 && contactid !== null) {
                isEditing = true;

                this.$('.modal-show-link').show();
                this.$('.profile-image-container').show();

                that.$("#title-holder").html("Edit Contact");
                var imageurl = that.model.get("imageurl");
                if (!imageurl) {
                    imageurl = "/app/img/placeholder.png";
                }
                that.$("#profile-image").attr("src", imageurl);
            }

            if (isEditing) {
                that.$('input[name=firstname]').val(that.model.get('firstname'));
                that.$('input[name=lastname]').val(that.model.get('lastname'));
                that.$('input[name=address]').val(that.model.get('address'));
                that.$('input[name=phone]').val(that.model.get('phone'));
                that.$('input[name=country]').val(that.model.get('country'));
            }

            /*
           * fill the relationship select
           */
            var relationshipselect = this.$('select[name=relationshipid]');

            $.when($.ajax(Http.createUrl('Home/AllRelationships'))).then(
                function (data, textStatus, jqXHR) {
                    if (textStatus == 'success') {
                        jsondata = jQuery.parseJSON(data); //for goodness sake 
                        $(jsondata['relationships_array']).each(function (key, val) {
                            relationshipselect.append($("<option>").attr('value', val['relationshipid']).text(val['type']));
                        });

                        if (isEditing) {
                            relationshipselect.val(parseInt(that.model.get('relationshipid'))); //assign a relationship id
                        }
                    }
                });
            //change this form's upload attribute to be dynamic
            this.$("#upload").attr("action", Http.createUrl("Home/Upload"));
          
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
        },
        openUploadModal: function (e) {
            e.preventDefault();
            var view = new UploadModalView({model:this.model});
            App.modalRegion.show(view);
         },
       
       
    });
});
