/*global requirejs */

// Ensure any request for this webjar brings in jQuery.
requirejs.config({
    shim: {
        'jquery-ui': [ 'webjars!jquery.js' ]
    }
});
