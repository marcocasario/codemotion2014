'use strict';
/* contact.js */

(function( codemotion2014 ){

  /* Oggetto UserModel() */
  function ContactModel() {
    
    //controlla se la variabile data è valorizzata altrimenti la inizializza come oggetto vuoto
    if ( !codemotion2014.commonUtils.isNotNull( data )){
      var data = {};
    }
    
    /* ------ PRIVATE ------ */



    /* ------ PUBLIC ------ */
    //metodo setData()
    this.setData = function ( newData ){
        if (newData && newData.length > 0){
            //se newData e' di tipo array (serializzato dal form)
            //valorizziamo data con tutti gli elementi del form che sono stati inviati

            for (var i = 0; i < newData.length; i++){
                data[newData[i].name] = newData[i].value;
            }
        }else if ( codemotion2014.commonUtils.isNotNull( newData ) ){

            //se newData non e' un array valorizziamo data con newData
            data = newData;
        }else {
            //altrimenti mostriamo un errore in console

            console.log('Non posso caricare i dati dal localStoraga');
            return false;
        }
        return true;
    };

    //Restituisce l'oggetto data
    this.getData = function (){
        return data;
    };
    return this;
  }

  codemotion2014.model.contact = new ContactModel;

})( codemotion2014);