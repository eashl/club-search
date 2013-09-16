/**
 * Application file
 *
 * @module app
 * @main app
 */

// ## AMD wrapper
( function(root, factory, name) {
  "use strict";

  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof root.jQuery === 'function') {
    root[name] = factory(root.jQuery);
  }

})((typeof window === 'object' && window) || this, function($) {
  "use strict";
  var App, root;

  root = (typeof window === 'object' && window) || this;

  /**
   * Application class with all DOM ready methods
   *
   * @class App
   * @constructor
   */
  App = (function() {
    var defaults, _this;

    /**
     * Constructor function for class App
     *
     * @constructor
     */
    function App(options) {
      _this = this;
      // create options object like in jQuery plugins
      this.o = $.extend(true, {}, defaults, options || {});
    }

    // jQuery like short code for prototype
    App.fn = App. prototype;

    /**
     * Init function
     *
     * @method init
     * @return {Boolean} true
     */
    App.fn.init = function() {
      var mobileScrollUp;

      // execute the Accessify HTML5 metho if exists
      if (typeof root.AccessifyHTML5 === 'function') {
        root.AccessifyHTML5();
      }

      // set js class for html tag
      $('html').removeClass('no-js').addClass('js');

      // iOS scroll function for hiding browser address bar
      mobileScrollUp = function() {
        return window.scrollTo(0, 1);
      };
      setTimeout(mobileScrollUp, 100);

      // get the form element from DOM
      this.$searchForm = $('#' + this.o.formId);

      this.formEvents();

      return true;
    };

    /**
     * Events for the search form
     *
     * @method formEvents
     * @return {Boolean} true after clearing
     */
    App.fn.formEvents = function() {
      this.$searchForm.submit(function(event) {
        // wait 100ms before clearing the input fields
        setTimeout(function() {
          _this.clearInputs();
        }, 100);

        /*
        if (_this.$searchForm.length === 0) {
          _this.$searchForm.after('<div id="searchList"></div>');
        }
        */
        return true;
      });
      return true;
    };

    /**
     * Clear input fields in search form
     *
     * @method clearInputs
     * @return {Boolean} true
     */
    App.fn.clearInputs = function() {
      _this.$searchForm.find(':input').each(function() {
        switch (this.type) {
          case "password":
          case "select-multiple":
          case "select-one":
          case "text":
          case "textarea":
            $(this).val("");
            break;
          case "checkbox":
          case "radio":
            this.checked = false;
        }
        return true;
      });
      return true;
    };

    // default config object for the class
    defaults = {
      formId: "searchForm"
    };

    return App;
  })();

  return App;
}, 'App');
