requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/vendor',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        common: '../common',
        plugins: '../plugins',
        company: '../company',
        contact: '../contact',
        helpdesk: '../helpdesk'
    }
});


// Start the main app logic.
requirejs(['jquery-1.10.2.min', 'common', 'plugins'], function   ($) {
    //jQuery, common and plugins
    //loaded and can be used here now.
    console.log('jQuery, common and plugins loaded');
    
    //controlliamo se servono le altre librerie
    codemotion2014.runtimeLoadLibs.checkLibIsLoaded( window.location.pathname );

});

//inizializziamo l'oggetto del nostro sito web
var codemotion2014 = {};

//include other libs
(function( requirejs, codemotion2014 ){


  function runtimeLoadLibs(){

    /* ------ PRIVATE ------ */

    function getCompanyLib (){
      requirejs(['company'], function   ($) {
          //jQuery, common and plugins
          //loaded and can be used here now.
          console.log('company lib loaded');
      });
    };

    function getContactLib (){
      requirejs(['contact'], function   ($) {
          //jQuery, common and plugins
          //loaded and can be used here now.
          console.log('contact lib loaded');
      });
    };

    function getHelpdeskLib (){
      requirejs(['helpdesk'], function   ($) {
          //jQuery, common and plugins
          //loaded and can be used here now.
          console.log('help desk lib loaded');
      });
    };

    /* ------ PUBLIC ------ */

    this.checkLibIsLoaded = function(path){

      switch (path){
        case '/company.html':
          if (!isNotNull(window.loadDemo)){
            getCompanyLib();  
          }
        break;
        case '/contact.html':
          if (!isNotNull(window.loadDemo)){
            getContactLib();  
          }
        break;

        case '/helpdesk.html':
          if (!isNotNull(window.loadDemo)){
            getHelpdeskLib();  
          }
        break;

      }

    }

    return this;

  }

  codemotion2014.runtimeLoadLibs = new runtimeLoadLibs;

})( requirejs, codemotion2014 );


