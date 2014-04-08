/* HelpDeskView.js */
'use strict';

//inizializziamo app
(function( codemotion2014 ){

  function HelpDeskModel(){

    /* ------ Private Properties ------ */
    var nickname = '';


    
    /* ------ PUBLIC FUNCTION ------ */

    //setNickname => valorizza la proprieta nickname
    this.setNickname = function (newNickName){
      
      if ( codemotion2014.commonUtils.isNotNull( newNickName ) && newNickName.length > 3){
        nickname = newNickName;
        return true;
      }
      return false;
    };

    //getNickname => restituisce la proprieta nickname
    this.getNickname = function(){
      return nickname;
    }
    
    return this;

  }

  codemotion2014.model.helpdesk = new HelpDeskModel;

})( codemotion2014 );
