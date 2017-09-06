var http = require('http'); 

var server = http.createServer(function(request, response){
    console.log ("Received a request");
    response.write("<body style = 'background:yellow'>Hurray</body"); 
    response.end(); 
}); 

server.listen(8080); 