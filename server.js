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
  
  path.exists(filename, function(exists) {
    
    var nowTime = new Date();

    if(!exists) {
        filename = path.join(process.cwd(), file404);
    }
 
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
 
      console.log(nowTime + "# Serve file:" + filename);
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));
 

/* websocket server */
var server = ws.createServer(function (connection) {
  connection.nickname = null
  connection.on("text", function (str) {
    if (connection.nickname === null) {
      connection.nickname = str
      broadcast(str+" entered")
    } else
      broadcast("["+connection.nickname+"] "+str)
  })
  connection.on("close", function () {
    broadcast(connection.nickname+" left")
  })
})
server.listen(8890)

function broadcast(str) {
  server.connections.forEach(function (connection) {
    connection.sendText(str)
  });
}

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");