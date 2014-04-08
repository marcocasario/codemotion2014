/*ContactView.js*/

'use strict';
/* contact.js */

(function( codemotion2014 ){

  /* Oggetto UserModel() */
  function ContactView() {
    
    //controlla se la variabile data è valorizzata altrimenti la inizializza come oggetto vuoto
    if ( !codemotion2014.commonUtils.isNotNull( data )){
      var data = {};
    }
    
    /* ------ PRIVATE ------ */



    /* ------ PUBLIC ------ */
    


    //imposta i valori all'interno del form
    this.setFormData = function  (){
        //recuperiamo le informazioni dal datamodel
        var data = codemotion2014.model.contact.getData();
        //se l'oggetto è valorizzato aggiungiamo i valori agli input del nostro form
        if (codemotion2014.commonUtils.isNotNull( data )) {
            $('#firstname').val( data.firstname );
            $('#email').val( data.email );
            $('#born').val( data.born );
            $('#topic').val( data.topic );
            $('#note').val( data.note );
        }
    }

    //mostra un anteprima del file
    this.previewfile = function (file) {
      if (tests.filereader === true && acceptedTypes[file.type] === true) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.src = event.target.result;
          image.width = 250; // a fake resize
          holder.appendChild(image);
        };
        reader.readAsDataURL(file);
      }  else {
        holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
        console.log(file);
      }
    }


    return this;
  }

  codemotion2014.view.contact = new ContactView;

})( codemotion2014);