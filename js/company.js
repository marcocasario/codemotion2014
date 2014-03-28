'use strict';

//Location information
var locationLatitude = 41.85332709856991,
locationLongitude = 12.444332400918938;

/* Ajax request for street information */
function doRequest(request) {
    
    jQuery.ajax({
        url: request.url,
        type: "GET",
        data: {'latlng': request.latlng, 'sensor': request.sensor},
        success: setCity,

    });

}


/* Comincia la nostra applicazione */
function loadDemo() {
  
  //controlliamo se il browser supporta le API per la geolocalizzazione
  if(navigator.geolocation) {
      $("#status").text("Il tuo browser supporta le API HTML5 Geolocation.");
      navigator.geolocation.getCurrentPosition(updateLocation);

      navigator.geolocation.getCurrentPosition(
          function(position) {
               //alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
               updateLocation(position);
          },
          function(error){
               alert('error reported' + error);
          }, {
               enableHighAccuracy: true
                    ,timeout : 30000
          }
      );
  }

}

// Funzione che aggirna le informazioni in tabella
function updateLocation(position) {

  //coordinate posizione attuale
  var latitude = position.coords.latitude,
  longitude = position.coords.longitude,
  //data di esecuzione (orario locale)
  now = new Date(),
  city;

  //controlliamo che l'utente abbia accettato di condividere la posizione
  if (!latitude || !longitude) {
      $("#status").text("HTML5 Geolocation is supported in your browser, but location is currently not available.");
      return;
  }

  city = get_api(latitude, longitude);
  loadMap(latitude, longitude);

  //stampiamo i dati ottenuti
  $("#latitude").text(latitude);
  $("#longitude").text(longitude);
  $("#time").text(now.toJSON());

}

/* imposta i dati sulla posizione attuale */
function setCity( response ){
    
    var html = '', 
        i;
    if (response.status === "OK"){
        
        for (var i = 0; i<response.results.length; i++){
            html += response.results[i].formatted_address+'<br><br>';
        }

        $("#formatted_address").html(html);

    }

}

/* get info from coordinates */
function get_api(latitude, longitude) {
    
    var request = {
        'url': 'http://maps.googleapis.com/maps/api/geocode/json',
        'latlng': Math.round(latitude,2)+','+Math.round(longitude,2),
        'sensor': false,
        'callback': setCity
    }

    doRequest(request);
}



/* Load Google Maps */
function loadMap(latitude, longitude){

    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var locationLatlng = new google.maps.LatLng(locationLatitude,locationLongitude),
    directionsDisplay = new google.maps.DirectionsRenderer(),
    directionsService = new google.maps.DirectionsService(),
    //Constructs a rectangle from the points at its south-west and north-east corners.
    bound = new google.maps.LatLngBounds(),
    mapOptions = {
      center: bound.getCenter(),
      zoom: 12,
    };
    

    function calcRoute() {
      var start = myLatlng,
      end = locationLatlng,
      request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
    }


    //Extends this bounds to contain the given point.
    bound.extend( myLatlng );
    bound.extend( locationLatlng );


    var map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions),
    companyLogo = new google.maps.MarkerImage('../img/marker_maps.png');

    console.log(map.getBounds());

    //set map to directionsDisplay object
    directionsDisplay.setMap(map);

    // To add the marker to the map, use the 'map' property
    new google.maps.Marker({
      position: myLatlng,
      map: map,
      title:"Sono qui!",
      animation: 'bounce'
    });
    new google.maps.Marker({
      position: locationLatlng,
      map: map,
      title:"Devo arrivare qui!",
      animation: 'drop',
      icon: companyLogo
    });

    //add direction information
    calcRoute();
}




/* Inizializzazione del codice */
loadDemo();