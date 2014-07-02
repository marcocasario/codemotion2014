(function(codemotion2014) {
   'use strict';

   function CommonUtils() {

      /* ------ PRIVATE PROPERTY ------ */
      var isOnline = true,
         that = this;


      /* ------ PRIVATE FUNCTION ------ */


      /* ------ PUBLIC FUNCTION ------ */

      /* main and common function */
      //controlla se l'oggetto passato non e' vuoto
      that.isNotNull = function(value) {
         return (typeof value !== 'undefined' && value !== null);
      };
      //show element
      that.show = function(dom) {
         if (that.isNotNull(dom) && typeof dom === 'object') {
            dom.removeClass('hide');
         }
      };

      //hide element
      that.hide = function(dom) {
         if (that.isNotNull(dom) && typeof dom === 'object') {
            dom.addClass('hide');
         }
      };

      that.isOnlineHandler = function() {
         isOnline = navigator.onLine;
         codemotion2014.commonUtils.onlineStatus.dispatch(isOnline);
      };

      /* ------ LISTENER ------ */
      window.addEventListener("offline", function(e) {
         codemotion2014.commonUtils.isOnlineHandler();
      });
      window.addEventListener("online", function(e) {
         codemotion2014.commonUtils.isOnlineHandler();
      });

      that.onlineStatus = new Signals();

      return that;
   }

   codemotion2014.commonUtils = new CommonUtils();
   codemotion2014.commonUtils.isOnlineHandler();

})(codemotion2014);