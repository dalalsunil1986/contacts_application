/**
 * FooterPageView
 *
 * Renders footer
 *
 * @author joel capillo <hunyoboy@gmail.com>
 */
define([
    'backboneMarionette',
    'text!templates/footer/footer.html'
], function (Marionette, FooterTemplate) {

    return Marionette.ItemView.extend({
        template: FooterTemplate
    });
});
