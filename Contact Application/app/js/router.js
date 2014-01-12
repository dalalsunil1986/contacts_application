/**
 * Application router  (Marionette style)
 *
 * Backbone routers are used for routing your applications URL’s when using hash tags(#)
 *
 */
define([
    'backboneMarionette',
    'controller'
], function (Marionette, Controller) {

    'use strict';
     var AppRouter = Marionette.AppRouter.extend({
        /**
         * The routes hash maps URLs with parameters to functions
         * on your router, similar to the View's events hash.
         *
         * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.approuter.md
         * @see controller.js
         */
        appRoutes:{
            //contact app routes
            '.*': 'goto_index',
            'index': 'goto_index',
            'contacts': 'goto_contacts',//displays all the contacts
            'contact/:id': 'goto_addoredit',
            'error/:number': 'goto_error', // #/error/number 
            '*path': 'goto_notFound',

        }       
    });
    return new AppRouter({controller:Controller});
});