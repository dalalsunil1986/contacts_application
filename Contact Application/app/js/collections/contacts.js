/**
 * Contacts Collection object
 * 
 * Model containing the interactive data as well as a large part of the logic 
 * surrounding it: conversions, validations, computed properties, 
 * and access control of ContactModel.
 * 
 * Here is where we need to setup logic with database
 * 
 */
define([
    'backbone',
    'models/contact'
], function (Backbone, contactModel) {

    return Backbone.Collection.extend({
        model: contactModel,
    });

});