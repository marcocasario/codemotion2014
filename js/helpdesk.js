/*helpdesk.js*/
//inizializziamo app
var app = {
    connection: {}, 
    nickname: '',
    status: 'closed'
};


$(document).ready( function (){
    if (!Modernizr.websockets) {alert("No WebSocket here");}

    //form event submit
    $('#form_nickname').submit(function (event) {
      //evitiamo il submit del form
      event.preventDefault();

      if ( setNickname() ){
        hide( $('.nickname_area') );
        show( $('.send_message_area') );
        setWSConnection();
      }

      //evitiamo il submit del form
      return false;
    });

    $('#form_message').submit(function (event) {
      //evitiamo il submit del form
       event.preventDefault();
       sendWsMessage();
       //evitiamo il submit del form
       return false;
    });
});

//valorizza l'oggetto app.nickname
function setNickname(){
  var newNickname = $('#nickname').val();
  if ( isNotNull( newNickname ) && newNickname.length > 3){
    app.nickname = newNickname;
    return true;
  }
  return false;

}

function setWSConnection(){
  if (isNotNull( app.nickname )){
    
    clearDomMessages();

    app.connection = new WebSocket("ws://"+window.location.hostname+":8890")
    app.connection.onopen = function () {
        console.log("Connection opened");
        app.connection.send(app.nickname);
        app.connection.status = 'open';
    }
    app.connection.onclose = function () {
        var newMessage = {"status":"out", "msg": "connection closed", "time": new Date()};
        setDomMessage(newMessage);
        app.connection.status = 'close';
    }
    app.connection.onerror = function () {
        
        var newMessage = {"status":"out", "msg": "Connection error", "time": new Date()};
        setDomMessage(newMessage);
        app.connection.status = 'close';

    }
    app.connection.onmessage = function (event) {
        setDomMessage(event.data);
    }
  }   
}

//pulisce l'area messaggi alla prima connessione dell'utente.
function clearDomMessages(){
  
  $('.welcome_message_area').hide();
  $('.title_message_area').show();
  $('.message_area').empty();

}


//scrive i messaggi che arrivano dal server mentre la connessione websocket resta in ascolto
function setDomMessage( message ){

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

//chiude la connessione al server webSocket
function closeWSConnection(){
  if (app.connection.status === 'open'){
    app.connection.close();
    app.connection.status = 'closed';
  }
}

function sendWsMessage(){
    
  var message = $('#message').val();
  if ( isNotNull( message )){
      console.log('Invio del messaggio al server: ' + message);
      app.connection.send(message);
      $('#message').val('');
  }

}
