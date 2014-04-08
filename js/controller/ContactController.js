/*ContactController.js*/
'use strict';

/* contact.js */
(function( codemotion2014 ){

  function Contact(){

    /* ------ PRIVATE PROPERTY ------ */

    /* Upload file usando il drag&drop */
    //definiamo le proprietà utilizzate dalle funzioni che si occuperanno di inviare il nostro file
    var holder = document.getElementById('holder'),
      
      // l'oggetto test si occuperà di intercettare l'evento al drag, 
      //di valorizzare il campo nel form e di inizializzare l'oggetto XMLHttpRequest
      tests = {
        filereader: typeof FileReader != 'undefined',
        dnd: 'draggable' in document.createElement('span'),
        formdata: !!window.FormData,
        progress: "upload" in new XMLHttpRequest
      }, 
      // oggetto che contiene i riferimenti agli oggetti del form
      //questi oggetti vengono mostrati se il browser non supporta questa tecnologia
      support = {
        filereader: document.getElementById('filereader'),
        formdata: document.getElementById('formdata'),
        progress: document.getElementById('progress')
      },
      //specificare il tipo di file che il form può inviare
      acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      },

      //oggetto progress bar
      progress = document.getElementById('uploadprogress'),
      //oggetto upload
      fileupload = document.getElementById('upload');

      //processa i tre elementi del dom, se il test ha successo li nasconde.

    "filereader formdata progress".split(' ').forEach(function (api) {
      if (tests[api] === false) {
        support[api].className = 'fail';
      } else {
        support[api].className = 'hidden';
      }
    });

    
    /* ------ PRIVATE FUNCTION ------ */
    
    //salva i dati nel LocalStorage
    function saveLocalstorageData(){
        console.log('Salvataggio dei dati utente');
        //utilizza l'oggetto localStorage per salvare i dati all'interno del browser
        localStorage.setItem('userData', JSON.stringify(codemotion2014.model.contact.getData()))
        alert('i dati sono stati salvati nel localstorage');
        return true;
    }


    

    // legge il file rilasciato sulla nostra pagina web
    function readfiles(files) {
        //imposta il punto di debug, simula il breackpoint del debugger presente sui browser
        debugger;
        //
        var formData = tests.formdata ? new FormData() : null;
        //cicla la lunghezza del file per generare l'anteprima
        for (var i = 0; i < files.length; i++) {
          //appende il file all'oggetto formdata
          if (tests.formdata) {
            formData.append('file', files[i]);
          }
          //richiama la funzione per leggere un file
          previewfile(files[i]);
        }
        // now post a new XHR request
        if (tests.formdata) {
          //istanziamo il nuovo oggetto XMLHttpRequest
          var xhr = new XMLHttpRequest();
          //specifichiamo dove dobbiamo inviare i dati del file da uploadare
          xhr.open('POST', 'http://comtaste.com/codemotion/upload_file.php');
          //aggiorniamo lo stato finale della nostra progressbar
          xhr.onload = function() {
            progress.value = progress.innerHTML = 100;
          };
          //controlliamo se la proprieta' progress e' disponibile
          if (tests.progress) {
            //all'evento onprogress aggiorniamo lo stato della nostra progressbar

            xhr.upload.onprogress = function (event) {
              if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                progress.value = progress.innerHTML = complete;
              }
            }
          }
          //
          xhr.send(formData);
        }
    }

    /* ------ PUBLIC FUNCTION ------ */
    /* Gestisce il salvataggio al click dell'utente sul tasto send del form */
    this.saveUser = function (e){
        e.preventDefault();
        //se i dati vengono popolati con successo, inviamo la richiesta al servizio
        if ( codemotion2014.model.contact.setData($(this).serializeArray())){
            saveLocalstorageData();
        }
    }

    this.getUserInformation = function (){
        //richiediamo i dati all'oggetto e popoliamo il model
        var response = localStorage.getItem('userData');
        codemotion2014.model.contact.setData( JSON.parse(response) );
        codemotion2014.view.contact.setFormData( codemotion2014.model.user );
    }

    
    /* ------ PUBLIC ------ */
    if (tests.dnd) { 
      holder.ondragover = function () { this.className = 'hover'; return false; };
      holder.ondragend = function () { this.className = ''; return false; };
      holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        readfiles(e.dataTransfer.files);
      }
    } else {
      fileupload.className = 'hidden';
      fileupload.querySelector('input').onchange = function () {
        readfiles(this.files);
      };
    }


    /* NET API */
    function isOnlineHandler( online ){

      if (online) {
        codemotion2014.commonUtils.hide($('.save'));
        codemotion2014.commonUtils.show($('.submit'));
      }else{
        codemotion2014.commonUtils.hide($('.submit'));
        codemotion2014.commonUtils.show($('.save'));
      }

    }
    
    //Listeners
    codemotion2014.commonUtils.onlineStatus.add(isOnlineHandler); //add listener

    //aggiungiamo l'evento al submit
    $('#form').submit(this.saveUser);

    return this;

  }
  
  //inizializziamo il nostro oggetto
  codemotion2014.contact = new Contact;
  
  //recuperiamo i dati dall'oggetto localStorage
  codemotion2014.contact.getUserInformation();

  codemotion2014.commonUtils.isOnlineHandler();

})( codemotion2014 );

