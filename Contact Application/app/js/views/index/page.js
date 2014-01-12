/**
 * Login Page View
 *
 * Renders login page
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'session',
    'text!templates/index/page.html',
    'models/login',
    'app',
    'http',
    'backboneValidation',
    'backboneValidationBootstrap',
    'serialize',
    'backboneBUI',
], function (Marionette, Session, IndexPageTemplate, LoginModel, App, Http) {

    return Marionette.ItemView.extend({
        /**
         * All Marionette views require a template
         */
        template:IndexPageTemplate,
        /**
         * Setup events
         */
        events:{
            'click button[name=sign-in]':'login'
        },

        /**
         * Backbone's initialize method
         */
        initialize:function () {
           _.bindAll(this, 'error');
            this.model = new LoginModel();
            Backbone.Validation.bind(this);
        },
         /**
         * Login user
         */
        login:function (e) {
            e.preventDefault();
            var that = this;
            var data = this.$('form').serializeObject();
            var model = new Backbone.Model();
            model.set({ username: null, password: null, RememberMe: false, isError: false });
            if (this.model.set(data)) {
                model.url = Http.createUrl('/Home/Login');
                model.save({
                    username:this.$('input[name=username]').val(),
                    password:this.$('input[name=password]').val()
                },{
                    wait:true,
                    success: function (data) {
                        if (data) {
                            model.set(data);
                            if (!model.get("isError")) {

                                App.router.navigate("contacts", { trigger: true });

                            }
                            else {
                                    that.error(model.get("isError"));
                             }
                            
                        }
                    }

                }

                );
            }
        
        },
       error:function(response) {
           if (response) {
                   var alertError = new Backbone.BUI.Alert({
                    ctype:Backbone.BUI.Config.Alert.ERROR,
                    title:'Oops!',
                    message:response,
                    renderTo:$('.head'), /* change to whatever */
                    timeout:3000
                });
                alertError.render();
            }
        },
        /**
         * Renders the login
         */
        beforeRender:function () {
           /* remove menu region */
           App.menuRegion.close();
        },
        onRender:function(){
             $("#brand").attr("href","#/index" );
        }
    });
});
