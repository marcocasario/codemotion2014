/* @Author: Luciano Murruni 
* Description: un semplice http server con relativa implementazione delle Websocket API
*/


/* variabili utilizzate dal server */
var http = require("http"),
    
    //modulo per la gestione delle URL
    url = require("url"),
    
    //modulo per la gestione dei percorsi 
    path = require("path"),
    
    //modulo per filesystem
    fs = require("fs"),
    
    //modulo websocket
    ws = require("nodejs-websocket"),
    
    //se la porta viene specificata come argomento la utilizza altrimenti imposta la porta di default 8888
    port = process.argv[2] || 8888,

    //impostiamo il file di default in caso di file non trovato
    file404 = '404.html';
 
/* webserver */
http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  /* Restituisce il content type in base all'estensione del file richiesta */
  function getContentType( filename ){
    //JS
    if (filename.indexOf('.js') != -1){return {'Content-Type': 'text/javascript'}
    //CSS
    }else if ( filename.indexOf('.css') != -1 ){return {'Content-Type': 'text/css'};
    //HTML
    }else if (filename.indexOf('.html') != -1 ){return {'Content-Type': 'text/html'};
    //JPG
    }else if (filename.indexOf('.jpg') != -1){return {'Content-type':'image/jpg'};
    //PNG
    }else if (filename.indexOf('.png') != -1){return {'Content-type':'image/png'};
    //GENERICO
    }else{return {'Content-Type': 'text/plain'};}
  }

  /* controlla se il path/file richiesto esiste e lo restituisce all'interno della response.
  * altrimenti restituisce il file 404
  */
  path.exists(filename, function(exists) {
    var nowTime = new Date(),
    contentType = '';
    //
    if(!exists) {filename = path.join(process.cwd(), file404);}
    //se non e' stato richiesto un file specifico restituisce il file index.html
    if (fs.statSync(filename).isDirectory()) {filename += '/index.html';}
    //legge il file ed inizializza l aresponse con il relativo content-type
    fs.readFile(filename, "binary", function(err, file) {
      //in caso di errore generico la response scrive il suo errore
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      //scrive il log
      console.log(nowTime + "# Serve file:" + filename);
      //recupera il content-type
      contentType = getContentType( filename );
      //scrive la response con il content-type
      response.writeHead(200, contentType);
      //aggiunge il contenuto del file all'interno della response
      response.write(file, "binary");
      //chiude la response
      response.end();
    });
  });
}).listen(parseInt(port, 10));
 

/* websocket server */
var server = ws.createServer(function (connection) {
  var nowTime = new Date();
  var newMessage = {status: "", message: "", time: nowTime.toJSON() };
  
  connection.nickname = null;

  connection.on("text", function (str) {
    if(connection.nickname === null) {
      connection.nickname = str;
      newMessage.status="in"
      newMessage.message= str +" è entrato";
      broadcast(JSON.stringify(newMessage));
    }else{
      newMessage.status="msg"
      newMessage.message= connection.nickname +": "+ str;
      broadcast(JSON.stringify(newMessage));
    }
  });
  connection.on("close", function () {
    newMessage.status="out"
    newMessage.message= connection.nickname +":  è uscito";
    broadcast(JSON.stringify(newMessage));
  });
  connection.on("error", function (e) {
    console.error(nowTime + "# Error:" + connection.nickname, e);
    connection.close();
  });
});
server.listen(8890);
function broadcast(str) {
  server.connections.forEach(function (connection) {
    connection.sendText(str);
  });
}
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");