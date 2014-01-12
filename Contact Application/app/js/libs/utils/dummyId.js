/**
 * DummyId object
 * 
 * Returns an initial id for logged-in users
 * 
 */
define([],function() {

    var dummyIdentity = 'gfuhsgdfhsdghsgsdgf6754236542';  //initial id for authenticated users
    
    return {
        /**
         * Checks whether is logged in or not
         * @return {Boolean}
         */
           dummyIdentity:function () {
            return dummyIdentity;
        }
    };

    
});
