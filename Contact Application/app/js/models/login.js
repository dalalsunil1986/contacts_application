/**
 * LoginModel object
 * 
 * Model containing the interactive data as well as a large part of the logic 
 * surrounding it: conversions, validations, computed properties, 
 * and access control of LoginModel.
 * 
 * Here is where we need to setup logic with database
 * 
 */
define([
	'backbone','dummyId'
	], function(Backbone, DummyId) {

		return Backbone.Model.extend({
    
				defaults:{
					username: null,
					password: null,
                 },
				
				/**
				* validation object
				* @see backbone.validation.js
				*/
				validation: {
					username: {
						required: true,
						msg: 'Please provide your username.'
					}
					,
					
					password: {
						required: true,
						msg: 'Password is required.'
					}
				}
	       });

	});

