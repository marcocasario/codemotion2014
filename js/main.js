'use strict';

/* 
* Main functions 
* @Description: 
* - inizializza l'oggetto codemotion2014
* - carica tutte le librerie comuni
*/

//inizializziamo l'oggetto principale del nostro sito web
var codemotion2014 = {
  model: {}, 
  view: {}, 
  controller: {},
  commonUtils: {},
  services: {}
};

var initialize = function(){};

requirejs.config({
    //By default load any module IDs from js/vendor
    baseUrl: 'js/',
    paths: {
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
            //If the CDN location fails, load from this location
            'vendor/jquery-1.10.2.min'
        ],
        googlemap: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nvub6YdbJZLIKdNjcVDfh2vPbI60vus&sensor=false&callback=initialize',
        signals: 'vendor/signals'
    }
});


// Start the main app logic.
requirejs(['vendor/modernizr-2.6.2.min'], function   ($) {
    //loaded and can be used here now.
    console.log('modernizr loaded');



    requirejs(['signals'], function   ($) {
        //loaded and can be used here now.
        console.log('signals loaded');

        requirejs(['jquery'], function   ($) {
            //jQuery, common and plugins
            //loaded and can be used here now.
            console.log('jQuery');
            
            requirejs(['loadLibrary', 'plugins', 'common'], function   ($) {
                console.log('library, common and plugins loaded');
                
                //controlliamo se servono le altre librerie
                codemotion2014.runtimeLoadLibs.checkLibIsLoaded();

                initialize = codemotion2014.runtimeLoadLibs.checkLibIsLoaded;
            });

        });
    });
});


