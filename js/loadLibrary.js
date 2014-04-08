//include other libs
(function( requirejs, codemotion2014 ){
  function RuntimeLoadLibs(){

    var lib = {
      contact: ['model/ContactModel', 'view/ContactView', 'controller/ContactController'],
      contact_min: ['build/contact.min'],
      helpdesk: ['model/HelpDeskModel', 'view/HelpDeskView', 'controller/HelpDeskController'],
      helpdesk_min: ['build/helpdesk.min'],
      company: ['googlemap', 'view/CompanyView', 'controller/CompanyController'],
      company_min: ['googlemap', 'build/company.min']
    };

    /* ------ PRIVATE ------ */
    function getCompanyLib (){
      //carica le librerie minifizzate o meno in base al parametro presente nel main
      requirejs(codemotion2014.isProduction === true ? lib.company_min : lib.company, function ($) {
          //googlemap & compamy loaded and can be used here now.
          console.log('googlemap& company lib loaded');

          if (codemotion2014.commonUtils.isNotNull(google.maps.LatLng)){

            //avviamo qui la nostra applicazione
            codemotion2014.controller.company.loadGeolocationInfo();
  
          }
          
      });
    }

    function getContactLib (){
      //carica le librerie minifizzate o meno in base al parametro presente nel main
      requirejs(codemotion2014.isProduction === true ? lib.contact_min : lib.contact, function ($) {
          
          //loaded and can be used here now.
          console.log('contact lib loaded');

      });
    }

    function getHelpdeskLib (){
      requirejs(codemotion2014.isProduction === true ? lib.helpdesk_min : lib.helpdesk, function   ($) {
          
          //loaded and can be used here now.
          console.log('help desk lib loaded');

      });
    }

    /* ------ PUBLIC ------ */

    this.checkLibIsLoaded = function(){
      var path = window.location.pathname;
      //in base alla pagina carichiamo i moduli necessari
      switch (path){
        case '/company.html':
          if (!codemotion2014.commonUtils.isNotNull(codemotion2014.company)){
            getCompanyLib();
          }
        break;
        case '/contact.html':
          if (!codemotion2014.commonUtils.isNotNull(codemotion2014.contact)){
            getContactLib();  
          }
        break;
        case '/helpdesk.html':
          if (!codemotion2014.commonUtils.isNotNull(codemotion2014.helpdesk)){
            getHelpdeskLib();
          }
        break;
      }
    };
    return this;
  }
  codemotion2014.runtimeLoadLibs = new RuntimeLoadLibs();

})( requirejs, codemotion2014 );