/**
 * main configuration file
 */
// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

// Require.js allows us to configure mappings to paths
// as demonstrated below:
// TODO: Load minified version of the libs or use Require.js's JS compiler (R)
require.config({
    urlArgs: "bust=" + (new Date()).getTime(), //should be taken out on production, prevents caching
    paths:{

        /* jquery + jquery-ui + jquery-plugins*/
        jquery:[
            'https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min',
            'libs/jquery/jquery-1.8.0.min'
        ],

        /* underscore */
        underscore:'libs/underscore/underscore',
        underscoreString:'libs/underscore/underscore.string',

        /* backbone */
        backbone:'libs/backbone/backbone',
        backboneRelational:'libs/backbone/backbone-relational',
        backboneBinder:'libs/backbone/backbone.model-binder',
        backboneValidation:'libs/backbone/backbone.validation',
        backboneValidationBootstrap:'libs/backbone/backbone.validation.bootstrap',
        backboneMarionette: 'libs/backbone/backbone.marionette',
        

        /* bui */
        backboneBUI:'libs/bui/backbone-bui',
        jqueryUI:'libs/jquery/jqueryUI',
        jqueryWidget:'libs/jquery/jqueryWidget', //the jquery widget needed for file upload
        
        /*jquery plugins*/
        jqueryIframeTransport:'libs/jquery-plugins/jquery.iframe-transport', //the jquery iframe transport needed for file upload
        jqueryFileUpload:'libs/jquery-plugins/jquery.fileupload', //the jquery file upload
        jqueryKnob:'libs/jquery-plugins/jquery.knob', //the jquery file upload

        /* requirejs plugins*/
        text:'libs/require/text',
        domReady:'libs/require/domReady',

        /* utility libraries */
        json:'libs/utils/json2',
        stringFormat:'libs/utils/string-format', /* TODO: move away to the object that actually requires it */
        parser:'libs/utils/parser',
        session:'libs/utils/session',
        http:'libs/utils/http',
        serialize:'libs/utils/serialize-object',
        security:'libs/utils/security',
        /* a shortcut to have the templates outside of the js directory */
        templates:'../templates',
        dummyId: 'libs/utils/dummyId', //loads a dummy id as an initial identity for user,
        bootstrapModal: 'libs/bui/bootstrap/bootstrap-modal',//loads the bootstap modal js
    },
    shim : {
        backbone : {
            exports : 'Backbone',
            deps : ['jquery','underscore']
        },
        backboneMarionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        backboneBUI: {
            deps: ['backbone']
        },
        backboneValidationBootstrap:{
            deps:['backbone','backboneValidation']  
        },
        bootstrapModal: {
            deps: ['jquery']
        },
        underscore : {
            exports : '_'
        },
        jqueryFileUpload:{
            deps:['jquery','jqueryKnob','jqueryWidget','jqueryIframeTransport'] 
        },
       
    },
    deps : ['jquery', 'underscore'],
    waitSeconds:15
})
;

// Let's kick off the application
// Let's kick off the application
require([
    'app',
    'router',
    'views/footer/footer'
], function (App, Router, FooterPageView) {

    App.addInitializer(function() {
        /* render footer page */
        var footerPage = new FooterPageView();
        App.footerRegion.show(footerPage);
    });

    /* attach router to the app */
    App.router = Router;
    
    App.start();

    Backbone.history.start();
});
