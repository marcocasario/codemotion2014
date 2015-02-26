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
   services: {},
   isProduction: true
};
var initialize = function() {};
requirejs.config({
   //By default load any module IDs from js/vendor
   baseUrl: 'js/',
   paths: {
      jquery: [
         'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
         //If the CDN location fails, load from this location
         'vendor/jquery-1.10.2.min'
      ],
      googlemap: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC3nvub6YdbJZLIKdNjcVDfh2vPbI60vus&sensor=false&callback=initialize',
      signals: 'vendor/signals'
   }
});
/**** NON MINIFY ***/
/*
// Start the main app logic.
requirejs(['vendor/modernizr-2.6.2.min'], function   ($) {
    //loaded and can be used here now.

    requirejs(['signals'], function   ($) {
        //loaded and can be used here now.

        requirejs(['jquery'], function   ($) {
            //jQuery, common and plugins
            //loaded and can be used here now.
            
            requirejs(['loadLibrary', 'plugins', 'common'], function   ($) {
                
                //controlliamo se servono le altre librerie
                codemotion2014.runtimeLoadLibs.checkLibIsLoaded();

                initialize = codemotion2014.runtimeLoadLibs.checkLibIsLoaded;
            });

        });
    });
});
*/

// Start the main app logic.
requirejs(['vendor/modernizr-2.6.2.min'], function($) {
   //loaded and can be used here now.

   requirejs(['signals'], function($) {
      //loaded and can be used here now.

      requirejs(['jquery'], function($) {
         //jQuery, common and plugins
         //loaded and can be used here now.

         var lib_common = {
            normal: ['common', 'plugins', 'loadLibrary'],
            min: ['build/common.min']
         };
         requirejs(codemotion2014.isProduction ? lib_common.min : lib_common.normal, function($) {

            //controlliamo se servono le altre librerie
            codemotion2014.runtimeLoadLibs.checkLibIsLoaded();

            initialize = codemotion2014.runtimeLoadLibs.checkLibIsLoaded;
         });

      });
   });
});