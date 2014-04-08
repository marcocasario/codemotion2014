/*CompanyController.js*/
'use strict';
/*
* company.js
*/
(function( codemotion2014 ){

  function CompanyController(){
    
    /* ------ PRIVATE ------ */
    function loadMap(lon,lat){
      //definiamo le variabili utilizzate dalla funzione
      var myLatlng = new google.maps.LatLng(lat,lon),
      bound = new google.maps.LatLngBounds(),
      mapOptions = {},
      map = {};
      var locationLatitude = 41.901556, locationLongitude = 12.502005, //Stazione di Roma Termini
      locationLatlng = new google.maps.LatLng(locationLatitude,locationLongitude),
      directionsDisplay = new google.maps.DirectionsRenderer(),
      directionsService = new google.maps.DirectionsService();

      function calcolaPercorso() {
        var request = {
          origin:myLatlng,
          destination:locationLatlng,
          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }

      //creiamo il nuovo oggeto, che google utilizza per centrare la mappa.
      bound.extend( myLatlng ),

      //definiamo le opzioni per la creazione della mappa
      mapOptions = {
          center: bound.getCenter(),
          zoom: 12,
      };

      //Istanziamo il nuovo oggetto google.maps.Map();
      map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
      
      //richiede le infomazioni con il percorso
      calcolaPercorso();

      //imposta la mappa con l'oggetto directionsDisplay
      directionsDisplay.setMap(map);

    } // loadMap

    /* ------ PUBLIC ------ */
    this.loadGeolocationInfo = function(){
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
           function(position) {
              
              codemotion2014.view.company.showInfo(position.coords);

              //richiamiamo la funzione che ci aggiorna la mappa.
              loadMap(position.coords.longitude, position.coords.latitude);

           },
           function(error){
              alert('error reported' + error);
           }, {
              enableHighAccuracy: true,
              timeout : 30000
           }
        );
      }
    };

    return this;
  }
  codemotion2014.controller.company = new CompanyController;

})( codemotion2014 );