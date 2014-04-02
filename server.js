var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    ws = require("nodejs-websocket"),
    port = process.argv[2] || 8888,
    file404 = '404.html';
 
/* webserver */
http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
  

  function getContentType( filename ){
    
    if (filename.indexOf('.js') != -1){
      return {'Content-Type': 'text/javascript'}

    }else if ( filename.indexOf('.css') != -1 ){
      return {'Content-Type': 'text/css'};

    }else if (filename.indexOf('.html') != -1 ){
      return {'Content-Type': 'text/html'};

    }else if (filename.indexOf('.jpg') != -1){
      return {'Content-type':'image/jpg'};

    }else if (filename.indexOf('.png') != -1){
      return {'Content-type':'image/png'};

    }else{
      return {'Content-Type': 'text/plain'};
    }

  }

  path.exists(filename, function(exists) {
    var nowTime = new Date(),
    contentType = '';
    if(!exists) {
        filename = path.join(process.cwd(), file404);
    }
    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      console.log(nowTime + "# Serve file:" + filename);
      contentType = getContentType( filename );
      response.writeHead(200, contentType);
      response.write(file, "binary");
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