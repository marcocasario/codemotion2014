/* contact.js */
/* Gestisce il salvataggio al click dell'utente sul tasto send del form */
function saveUser (e){
    e.preventDefault();
    //se i dati vengono popolati con successo, inviamo la richiesta al servizio
    if ( userModel.setData($(this).serializeArray())){
        saveLocalstorageData();
    }
}

/* Oggetto UserModel() */
function UserModel() {
    //controlla se la variabile data è valorizzata altrimenti la inizializza come oggetto vuoto
    if ( !isNotNull( data )){
      var data = {};
    }
    //metodo setData()
    this.setData = function ( newData ){   
        if (newData && newData.length > 0){
            //se newData e' di tipo array (serializzato dal form)
            //valorizziamo data con tutti gli elementi del form che sono stati inviati

            for (var i = 0; i < newData.length; i++){
                data[newData[i].name] = newData[i].value;
            }
        }else if ( isNotNull( newData ) ){

            //se newData non e' un array valorizziamo data con newData
            data = newData;
        }else {
            //altrimenti mostriamo un errore in console

            console.log('Errore....');
            return false;
        }
        return true;

    };

    //Restituisce l'oggetto data
    this.getData = function (){
        return data;
    };
    return this;
}


//salva i dati nel LocalStorage
function saveLocalstorageData( ){
    console.log('Salvataggio dei dati utente', userModel);
    //utilizza l'oggetto localStorage per salvare i dati all'interno del browser
    localStorage.setItem('userData', JSON.stringify(userModel.getData()))
    return true;
}

//inizializziamo il modello
var userModel = new UserModel;
//recuperiamo i dati dall'oggetto localStorage
getUserInformation();
//aggiungiamo l'evento al submit
$('#form').submit(saveUser);

function getUserInformation (){
    //richiediamo i dati all'oggetto e popoliamo il model
    var response = localStorage.getItem('userData');
    userModel.setData( JSON.parse(response) );
    setFormData( userModel );
}

function setFormData (){
    //recuperiamo le informazioni dal datamodel
    var data = userModel.getData();
    //se l'oggetto è valorizzato aggiungiamo i valori agli input del nostro form
    if (isNotNull( data )) {
        $('#firstname').val( data.firstname );
        $('#email').val( data.email );
        $('#born').val( data.born );
        $('#topic').val( data.topic );
        $('#note').val( data.note );
    }
}

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


// legge il file uploadato
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

function previewfile(file) {
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
function changeNetworkStatus(){
  if (navigator.onLine) {
    hide($('.save'));
    show($('.submit'));
  }else{
    hide($('.submit'));
    show($('.save'));
  }
}
window.addEventListener("offline", function(e) {
  changeNetworkStatus();
});
window.addEventListener("online", function(e) {
  changeNetworkStatus();
});

changeNetworkStatus();