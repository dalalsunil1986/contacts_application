/**
 * Extends The Marionette Region
 *
 * 
 * @author Joel Capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'bootstrapModal'
], function (Marionette) {
    var ModalRegion = Marionette.Region.extend({
        el: "#modal",

        constructor: function () {
            _.bindAll(this,'getEl','showModal','hideModal');
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on("view:show", this.showModal, this);
        },

        getEl: function (selector) {
            var $el = $(selector);
            $el.on("hidden", this.close);
            return $el;
        },

        showModal: function (view) {
            view.on("close", this.hideModal, this);
            this.$el.modal('show');
        },

        hideModal: function () {
            this.$el.modal('hide');
        }
    });
    return ModalRegion;
});