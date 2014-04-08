//include other libs
(function( requirejs, codemotion2014 ){
  function runtimeLoadLibs(){

    /* ------ PRIVATE ------ */
    function getCompanyLib (){
      requirejs(['googlemap', 'view/CompanyView', 'controller/CompanyController'], function   ($) {
          //googlemap & compamy loaded and can be used here now.
          console.log('googlemap& company lib loaded');

          if (codemotion2014.commonUtils.isNotNull(google.maps.LatLng)){

            //avviamo qui la nostra applicazione
           codemotion2014.controller.company.loadGeolocationInfo();
  
          }
          
      });
    };

    function getContactLib (){
      requirejs(['model/ContactModel', 'view/ContactView', 'controller/ContactController'], function   ($) {
          
          //loaded and can be used here now.
          console.log('UserModel lib loaded');

      });
    };

    function getHelpdeskLib (){
      requirejs(['model/HelpDeskModel', 'view/HelpDeskView', 'controller/HelpDeskController'], function   ($) {
          
          //loaded and can be used here now.
          console.log('help desk lib loaded');

      });
    };

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

    }
    return this;
  }
  codemotion2014.runtimeLoadLibs = new runtimeLoadLibs;

})( requirejs, codemotion2014 );