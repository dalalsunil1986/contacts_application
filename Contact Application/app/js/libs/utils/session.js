define([
    'jquery','http'
], function ($,Http) {
    var authUri = Http.createUrl('/Home/isLogged');

    return {
        /**
         * Checks whether is logged in or not
         * @return {Boolean}
         */
        checkAuth:function (callback) {
            $.when($.ajax(authUri)).then(callback);
        }
    };
});