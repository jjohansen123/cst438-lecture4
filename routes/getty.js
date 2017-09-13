var express = require('express');
var router = express.Router();
var https = require('https');
const options = {
    //headers go here
    hostname: 'api.gettyimages.com',
    port: 443,
    path: '/v3/search/images',
    method: 'GET',
    headers: {
        'Api-Key': '53f6jxd683q7rbv7vdfx33cq'
    }
};

function makeApiRequest(sendBackResponseToBrowser) {
    var apiResponse = ''; 
    
    https.get(options, function(response) {
        
        //if problems use: 
        //response.setEncoding('utf8'); 
        
        response.on('data', function(chunk){
            //data comes in packets ==> "chunks"
            console.log("Received data: " + chunk);
            apiResponse += chunk; 
        });
        
        response.on('end', function() {
            // finished recieving the response
            console.log("Status code: " + this.statusCode); 
            console.log("Complete response: " + apiResponse);
            sendBackResponseToBrowser(apiResponse); 
        }); 
    
    }).on("error", function(e) {
        // handle error
        console.log("Got error: " + e.message); 
    }); 
}



/* GET about page. */
router.get('/', function(req, res, next) {
  
  //res.render('getty', {title: 'About'});
  makeApiRequest(function(jsonToSendBack) {
      res.send(jsonToSendBack); //body of callback
  });
});

module.exports = router;
