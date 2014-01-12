/**
 * Secures the page for authentication, identity etc. before loading
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'app','http'
], function (App,Http) {
    
    var security = {
        /**
        *securePageLoad
        * @param string viewPath the path to the view that will load the page
        */
        securePageLoad: function (viewPath,id) {
            var that = this;
            var model = new Backbone.Model();
            model.set({ isauthenticated: false, userid: null, username: null });
            model.url = Http.createUrl("Home/IsLogged");
            model.fetch({
                success: function () {
                    var data = model.toJSON;
                    model.set(data);
                    var isauthenticated = model.get("isauthenticated");
                    if (!isauthenticated) {
                        //redirect to dashboard page
                        App.router.navigate('index', { trigger: true });
                    }
                    else {
                      
                        var request = Backbone.history.fragment;
                        var username = model.get("username");
                        var options = { username: username, isauthenticated: isauthenticated }; //contacts page
                        if (request.toLowerCase() === "contacts" && !id) {
                           that.contactsHandler(viewPath, options);
                        }
                        else if (request.toLowerCase().indexOf("contact") >= 0 && id !== null && jQuery.isNumeric(id)) {
                           that.editHandler(viewPath, id);//editing contact
                        }
                        else{
                            that.addHandler(viewPath); //adding a new contact
                        }
                        
                    }
                },
                error: function () {
                    //handles server error
                    App.router.navigate('error/500', { trigger: true });
                }
            });
        },
        /**
       * contactsHandler
       * 
       * @param array options values to pass to the header
       * @param string viewPath the path to the view 
       */
        contactsHandler: function (viewPath,options) {
            

            require([viewPath], function (MasterContactView) {
                  var Uri = Http.createUrl('Home/AllContacts');
                  $.when($.ajax(Uri)).then(function (data) {
                        var contacts = jQuery.parseJSON(data); //for goodness sake
                        var model = new Backbone.Model();
                        model.set({options:options,contacts:contacts});
                        var masterContactView = new MasterContactView({ model:model });
                        App.pageRegion.show(masterContactView);
                    });
                })


           
        },
       /**
      * editHandler
      * 
      * @param integer id the contactid to edit
      * @param string viewPath the path to the view 
      */
        editHandler: function (viewPath,id) {

            require([viewPath, 'models/contact'], function ( EditView, ContactModel) {

                var contactmodel = new ContactModel();
                contactmodel.url = Http.createUrl("Home/Edit/" + id);//get request url

                contactmodel.fetch({
                    success: function () {

                        var data = contactmodel.toJSON;
                        contactmodel.set(data);

                        var editview = new EditView({model:contactmodel});
                        App.pageRegion.show(editview);
                    
                    },
                    error: function () {
                        //handles server error
                        App.router.navigate('error/500', { trigger: true });
                    }
                });
            })
        },
      /**
     * addHandler
     * 
     * 
     * @param string viewPath the path to the view 
     */
        addHandler: function (viewPath) {
            require([viewPath, 'models/contact'], function (AddView, ContactModel) {
                        var addview = new AddView({ model: new ContactModel() });
                        App.pageRegion.show(addview);
            })
        }
    }
    
    return security;
    
});