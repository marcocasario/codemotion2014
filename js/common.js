'use strict';
(function(codemotion2014){

  function commonUtils(){

    /* ------ PRIVATE PROPERTY ------ */
    var isOnline = true;

    /* ------ PRIVATE FUNCTION ------ */
    

    /* ------ PUBLIC FUNCTION ------ */

    /* main and common function */
    //controlla se l'oggetto passato non e' vuoto
    this.isNotNull = function ( value ){
        return ( typeof value !== 'undefined' && value !== null );
    }

    //show element
    this.show = function( dom ){
      if( this.isNotNull(dom) && typeof dom === 'object'){
        dom.removeClass('hide');
      }
    }

    //hide element
    this.hide = function( dom ){
      if( this.isNotNull(dom) && typeof dom === 'object'){
        dom.addClass('hide');
      }
    }

    this.isOnlineHandler = function(){
      isOnline = navigator.onLine;
      codemotion2014.commonUtils.onlineStatus.dispatch(isOnline);
    }

    /* ------ LISTENER ------ */
    window.addEventListener("offline", function(e) {
      codemotion2014.commonUtils.isOnlineHandler();
    });
    window.addEventListener("online", function(e) {
      codemotion2014.commonUtils.isOnlineHandler();
    });
    
    this.onlineStatus = new signals();

    return this;
  }

  codemotion2014.commonUtils = new commonUtils;
  codemotion2014.commonUtils.isOnlineHandler();

})( codemotion2014 );