/*CompanyView.js*/
'use strict';

(function( codemotion2014 ){

  /* Oggetto UserModel() */
  function CompanyView() {
    
    
    /* ------ PRIVATE ------ */



    /* ------ PUBLIC ------ */
    


    //imposta i valori all'interno del form
    this.showInfo = function  (coords){
      $('.accuracy').html( coords.accuracy );
      $('.altitude').html( coords.altitude );
      $('.altitudeAccuracy').html( coords.altitudeAccuracy );
      $('.heading').html( coords.heading );
      $('.latitude').html( coords.latitude );
      $('.longitude').html( coords.longitude );
    }

    return this;
  }

  codemotion2014.view.company = new CompanyView;

})( codemotion2014);