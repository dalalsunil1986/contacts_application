
/**
 * Application controller
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'http',
    'app',
    'session',
    'security',
], function(Marionette, Http, App, Session, Security) {
    'use strict';
    return {

        /* renders index page - login*/
        goto_index: function () {
            var model = new Backbone.Model();
            model.set({ isauthenticated: false, userid: null, username: null });
            model.url = Http.createUrl("Home/IsLogged");
            model.fetch({
                success: function () {
                    var data = model.toJSON;
                    model.set(data);
                    var isauthenticated = model.get("isauthenticated");
                    if (isauthenticated) {
                        //redirect to dashboard page
                        App.router.navigate('contacts', { trigger: true });
                    }
                    else {
                       require(['views/index/page'], function (IndexPage) {
                            var indexPage = new IndexPage();
                            App.pageRegion.show(indexPage);
                       })
                    }
                },
                error: function () {
                    //handles server error
                    App.router.navigate('error/500', { trigger: true });
                }
            });
        },
        //render the edit or page
        goto_addoredit:function(id){
            Security.securePageLoad('views/edit/page',id);
        },
       //renders the all contacts page
        goto_contacts: function () {
            Security.securePageLoad('views/contacts/masterpage',null);
        },
        /* triggers not found error/404 when page is not found */
        goto_notFound: function () {
            App.router.navigate('error/404', { trigger: true });
        },
        /* renders error page with correspondent failure number */
        goto_error: function (actions) {
            require(['views/error/page'], function (ErrorPage) {
                if (Http.isUnAuthorized(actions)) {
                    App.router.navigate('index', { trigger: true });
                    return;
                }
                var description = Http.getStatusDescription(actions) || 'Unknown';
                var errorPage = new ErrorPage({ model: new Backbone.Model({ number: actions, description: description }) });
                App.pageRegion.show(errorPage);
            });
        },

    }
});