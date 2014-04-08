/* HelpDeskView.js */
'use strict';

//inizializziamo app
(function( codemotion2014 ){
  
  function HelpDeskView(){

    /* ------ Private FUNCTION ------ */

    

    
    /* ------ PUBLIC FUNCTION ------ */

    //pulisce l'area messaggi alla prima connessione dell'utente.
    this.clearDomMessages = function (){
      
      $('.welcome_message_area').hide();
      $('.title_message_area').show();
      $('.message_area').empty();

    }

    //scrive i messaggi che arrivano dal server mentre la connessione websocket resta in ascolto
    this.setDomMessage = function ( message ){

      var newMessage = jQuery.parseJSON( message ),
      element = document.createElement('li'),
      domElement = $('.message_area'),
      time = '';

      function getTime(){
        var newTime = new Date(newMessage.time);
        return newTime.getUTCHours()+":"+newTime.getUTCMinutes();
      }

      time = getTime();

      element.className = 'user_message'+' ' + newMessage.status;
      
      element.appendChild (document.createTextNode("["+time+"] " + newMessage.message) );

      domElement.append( element );
      domElement.animate({'scrollTop': domElement[0].scrollHeight});

    }
    
    return this
  }

  codemotion2014.view.helpdesk = new HelpDeskView;


})( codemotion2014 );
