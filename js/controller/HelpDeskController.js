/*
* HelpDeskController.js
* Description: 
*/

'use strict';
(function( codemotion2014 ){

  function HelpDeskController(){

    /* ------ PROPERTY ------ */
    codemotion2014.services.websocket = {connection: {}, 
        status: 'closed'};

    /* ------ Private FUNCTION ------ */


    function setWSConnection(){
      if (codemotion2014.commonUtils.isNotNull( codemotion2014.model.helpdesk.getNickname() )){
        
        codemotion2014.view.helpdesk.clearDomMessages();

        codemotion2014.services.websocket.connection = new WebSocket("ws://"+window.location.hostname+":8890")
        codemotion2014.services.websocket.connection.onopen = function () {
            console.log("Connection opened");
            codemotion2014.services.websocket.connection.send(codemotion2014.model.helpdesk.getNickname());
            codemotion2014.services.websocket.connection.status = 'open';
        }
        codemotion2014.services.websocket.connection.onclose = function () {
            var newMessage = {"status":"out", "msg": "connection closed", "time": new Date()};
            codemotion2014.view.helpdesk.setDomMessage(newMessage);
            codemotion2014.services.websocket.connection.status = 'close';
        }
        codemotion2014.services.websocket.connection.onerror = function () {
            
            var newMessage = {"status":"out", "msg": "Connection error", "time": new Date()};
            codemotion2014.view.helpdesk.setDomMessage(newMessage);
            codemotion2014.services.websocket.connection.status = 'close';

        }
        codemotion2014.services.websocket.connection.onmessage = function (event) {
            codemotion2014.view.helpdesk.setDomMessage(event.data);
        }
      }   
    }

    //chiude la connessione al server webSocket
    function closeWSConnection(){
      if (codemotion2014.services.websocket.connection.status === 'open'){
        codemotion2014.services.websocket.connection.close();
        codemotion2014.services.websocket.connection.status = 'closed';
      }
    }

    function sendWsMessage(){
        
      var message = $('#message').val();
      if ( codemotion2014.commonUtils.isNotNull( message )){
          console.log('Invio del messaggio al server: ' + message);
          codemotion2014.services.websocket.connection.send(message);
          $('#message').val('');
      }

    }

    //HANDLER
    function setNickNameHandler(event) {
      //evitiamo il submit del form
      event.preventDefault();
      var newNickname = $('#nickname').val();
      if (codemotion2014.commonUtils.isNotNull(newNickname)){

        if ( codemotion2014.model.helpdesk.setNickname(newNickname) ){
          codemotion2014.commonUtils.hide( $('.nickname_area') );
          codemotion2014.commonUtils.show( $('.send_message_area') );
          setWSConnection();
        }

      }
      //evitiamo il submit del form
      return false;
    }

    function sedMessageHandler (event) {
      //evitiamo il submit del form
       event.preventDefault();
       sendWsMessage();
       //evitiamo il submit del form
       return false;
    };

    
    /* ------ PUBLIC FUNCTION ------ */


    /* ------ Listener ------ */
    if (!Modernizr.websockets) {
      alert("No WebSocket here");
      codemotion2014.commonUtils.hide( $('.nickname_area') );
      codemotion2014.commonUtils.hide( $('.send_message_area') );
    } else {

      //form event submit
      $('#form_nickname').submit(setNickNameHandler);
      $('#form_message').submit(sedMessageHandler);

    }

  }

  codemotion2014.controller.helpdesk = new HelpDeskController;


})( codemotion2014 );
