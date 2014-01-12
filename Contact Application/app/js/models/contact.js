/**
 * Contact Model object
 * 
 * Model containing the interactive data as well as a large part of the logic 
 * surrounding it: conversions, validations, computed properties, 
 * and access control of ContactModel.
 * 
 * Here is where we need to setup logic with database
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'backbone'
], function (Backbone) {

    return Backbone.Model.extend({
        defaults: {
            contactid: null,
            firstname: null,
            lastname: null,
            phone: null,
            address: null,
            country: null,
            relationshipid: null,
            imageurl:null,
        },


        /**
            * validation object
            * @see backbone.validation.js
            */
        validation: {

            firstname: {
                required: true,
                msg: 'Please provide your first name.'
            },
			lastname: {
                required: true,
                msg: 'Password is required.'
            },
            phone: {
                required: true,
                msg: 'Phone is required.'
            },
            address: {
                required: true,
                msg: 'Address is required.'
            },
            country: {
                required: true,
                msg: 'Country is required.'
            },

        }
 
    });

});