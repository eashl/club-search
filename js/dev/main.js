/**
 * Main JavaScript file
 *
 * @module main
 * @main main
 */

/* global
   jQuery
*/

jQuery.noConflict();

(function($, root, document, undefined) {
  "use strict";

  // jQuery DOM ready function
  $(document).ready(function() {
    // init App if App class exists
    if (typeof root.App === 'function') {
      var app = new root.App();
      app.init();
      root.app = app;
    }
  });

})(jQuery, window, document);
